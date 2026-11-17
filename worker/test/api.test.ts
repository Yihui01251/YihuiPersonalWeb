import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { ADMIN_TOKEN, createTestApi, disposeTestApi, type TestApi } from "./harness";

let api: TestApi;

beforeEach(async () => {
  api = await createTestApi();
});
afterAll(disposeTestApi);

const post = (body: unknown, ip?: string) => api.call("POST", "/messages", { body, ip });
const approve = (id: number) =>
  api.call("PATCH", `/admin/messages/${id}`, { token: ADMIN_TOKEN, body: { status: "approved" } });

describe("留言：送出與審核流程", () => {
  it("新留言為待審核，核准前不會出現在公開列表", async () => {
    const created = await post({ name: "小明", content: "網站做得很清楚" });
    expect(created.status).toBe(201);
    expect(created.json.data.status).toBe("pending");

    expect((await api.call("GET", "/messages")).json.data).toEqual([]);

    await approve(created.json.data.id);

    const list = await api.call("GET", "/messages");
    expect(list.json.data).toHaveLength(1);
    expect(list.json.data[0]).toMatchObject({ name: "小明", content: "網站做得很清楚" });
  });

  it("公開列表不外洩審核狀態與訪客雜湊", async () => {
    const created = await post({ name: "小明", content: "你好" });
    await approve(created.json.data.id);

    const [message] = (await api.call("GET", "/messages")).json.data;
    expect(Object.keys(message).sort()).toEqual(["content", "createdAt", "id", "name"]);
  });

  it("被退回的留言不會公開", async () => {
    const created = await post({ name: "小明", content: "你好" });
    await api.call("PATCH", `/admin/messages/${created.json.data.id}`, {
      token: ADMIN_TOKEN,
      body: { status: "rejected" },
    });
    expect((await api.call("GET", "/messages")).json.data).toEqual([]);
  });
});

describe("留言：輸入驗證", () => {
  it("缺少欄位時逐欄回報錯誤", async () => {
    const res = await post({ name: "  ", content: "" });
    expect(res.status).toBe(400);
    expect(res.json.error.code).toBe("VALIDATION_FAILED");
    expect(Object.keys(res.json.error.fields).sort()).toEqual(["content", "name"]);
  });

  it("長度以字元計：40 個中文字的稱呼可以通過，41 個不行", async () => {
    expect((await post({ name: "字".repeat(40), content: "你好" })).status).toBe(201);
    const tooLong = await post({ name: "字".repeat(41), content: "你好" }, "203.0.113.9");
    expect(tooLong.status).toBe(400);
    expect(tooLong.json.error.fields.name).toBeTruthy();
  });

  it("內容超過 500 字被拒絕", async () => {
    expect((await post({ name: "小明", content: "字".repeat(501) })).status).toBe(400);
  });

  it("前後空白與控制字元會被移除後才儲存", async () => {
    const created = await post({ name: "  小\u0000明  ", content: "\u0007第一行\n第二行  " });
    await approve(created.json.data.id);
    const [message] = (await api.call("GET", "/messages")).json.data;
    expect(message.name).toBe("小明");
    expect(message.content).toBe("第一行\n第二行");
  });

  it("HTML 與 SQL 片段原樣儲存為文字，不會被執行", async () => {
    const content = `<script>alert(1)</script> '); DROP TABLE messages;--`;
    const created = await post({ name: "測試", content });
    await approve(created.json.data.id);
    const list = await api.call("GET", "/messages");
    expect(list.json.data[0].content).toBe(content);
  });

  it("不是 JSON 的請求回 415，擋下跨站表單送出", async () => {
    const res = await api.call("POST", "/messages", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    expect(res.status).toBe(415);
  });

  it("JSON 格式錯誤回 400 而不是 500", async () => {
    const { default: app } = await import("../index");
    const raw = await app.request(
      "/api/messages",
      { method: "POST", headers: { "Content-Type": "application/json" }, body: "{oops" },
      api.env,
    );
    expect(raw.status).toBe(400);
  });

  it("超過大小上限的請求回 413", async () => {
    const res = await post({ name: "小明", content: "a".repeat(9000) });
    expect(res.status).toBe(413);
  });
});

describe("留言：防濫用", () => {
  it("同一訪客一小時內第 4 則留言被限流，其他訪客不受影響", async () => {
    for (let i = 0; i < 3; i += 1) {
      expect((await post({ name: "小明", content: `第 ${i} 則` })).status).toBe(201);
    }
    const limited = await post({ name: "小明", content: "第 4 則" });
    expect(limited.status).toBe(429);
    expect(limited.headers.get("Retry-After")).toBe("3600");

    expect((await post({ name: "小華", content: "你好" }, "203.0.113.2")).status).toBe(201);
  });

  it("蜜罐欄位有值時回覆成功但不寫入", async () => {
    const res = await post({ name: "bot", content: "spam", website: "http://spam.example" });
    expect(res.status).toBe(201);
    const pending = await api.call("GET", "/admin/messages?status=pending", { token: ADMIN_TOKEN });
    expect(pending.json.data).toEqual([]);
  });

  it("資料庫不保存原始 IP", async () => {
    await post({ name: "小明", content: "你好" }, "198.51.100.77");
    const row = await api.db.prepare("SELECT visitor_hash FROM messages").first<{ visitor_hash: string }>();
    expect(row?.visitor_hash).toMatch(/^[0-9a-f]{32}$/);
    expect(row?.visitor_hash).not.toContain("198.51.100.77");
  });
});

describe("留言：分頁", () => {
  it("以游標由新到舊翻頁，不重複也不遺漏", async () => {
    for (let i = 1; i <= 5; i += 1) {
      const created = await post({ name: "訪客", content: `留言 ${i}` }, `203.0.113.${i}`);
      await approve(created.json.data.id);
    }

    const first = await api.call("GET", "/messages?limit=2");
    expect(first.json.data.map((m: { content: string }) => m.content)).toEqual(["留言 5", "留言 4"]);

    const second = await api.call("GET", `/messages?limit=2&cursor=${first.json.nextCursor}`);
    expect(second.json.data.map((m: { content: string }) => m.content)).toEqual(["留言 3", "留言 2"]);

    const third = await api.call("GET", `/messages?limit=2&cursor=${second.json.nextCursor}`);
    expect(third.json.data.map((m: { content: string }) => m.content)).toEqual(["留言 1"]);
    expect(third.json.nextCursor).toBeNull();
  });
});

describe("管理端點：授權", () => {
  it("沒有或錯誤的憑證回 401", async () => {
    expect((await api.call("GET", "/admin/messages")).status).toBe(401);
    expect((await api.call("GET", "/admin/messages", { token: "wrong" })).status).toBe(401);
    expect(
      (await api.call("PATCH", "/admin/messages/1", { token: "wrong", body: { status: "approved" } }))
        .status,
    ).toBe(401);
    expect((await api.call("DELETE", "/admin/messages/1", { token: "wrong" })).status).toBe(401);
  });

  it("伺服器未設定憑證時管理端點停用，空字串憑證也無法通過", async () => {
    api.env.ADMIN_TOKEN = undefined;
    expect((await api.call("GET", "/admin/messages", { token: "" })).status).toBe(503);
    expect((await api.call("GET", "/admin/messages", { token: "undefined" })).status).toBe(503);
  });

  it("可依狀態列出、刪除留言；不存在的 id 回 404", async () => {
    const created = await post({ name: "小明", content: "你好" });
    const id = created.json.data.id;

    const pending = await api.call("GET", "/admin/messages?status=pending", { token: ADMIN_TOKEN });
    expect(pending.json.data).toHaveLength(1);
    expect(pending.headers.get("Cache-Control")).toBe("no-store");

    expect((await api.call("DELETE", `/admin/messages/${id}`, { token: ADMIN_TOKEN })).status).toBe(204);
    expect((await api.call("DELETE", `/admin/messages/${id}`, { token: ADMIN_TOKEN })).status).toBe(404);
    expect(
      (await api.call("PATCH", "/admin/messages/abc", { token: ADMIN_TOKEN, body: { status: "approved" } }))
        .status,
    ).toBe(404);
  });

  it("不合法的狀態值回 400", async () => {
    const created = await post({ name: "小明", content: "你好" });
    const res = await api.call("PATCH", `/admin/messages/${created.json.data.id}`, {
      token: ADMIN_TOKEN,
      body: { status: "published" },
    });
    expect(res.status).toBe(400);
  });
});

describe("作品瀏覽數", () => {
  it("同一訪客同一天重複瀏覽只計一次，不同訪客分別計數", async () => {
    const first = await api.call("POST", "/projects/sports-data/views", { ip: "203.0.113.1" });
    const repeat = await api.call("POST", "/projects/sports-data/views", { ip: "203.0.113.1" });
    await api.call("POST", "/projects/sports-data/views", { ip: "203.0.113.2" });
    await api.call("POST", "/projects/media-platform/views", { ip: "203.0.113.1" });

    expect(first.json.data.counted).toBe(true);
    expect(repeat.json.data.counted).toBe(false);

    const counts = await api.call("GET", "/projects/views");
    expect(counts.json.data).toEqual({ "sports-data": 2, "media-platform": 1 });
  });

  it("清單以外的作品 id 回 404 且不寫入資料庫", async () => {
    const res = await api.call("POST", "/projects/not-a-project/views");
    expect(res.status).toBe(404);
    expect((await api.call("GET", "/projects/views")).json.data).toEqual({});
  });
});

describe("共通行為", () => {
  it("未定義的 API 路徑回 JSON 格式的 404", async () => {
    const res = await api.call("GET", "/nope");
    expect(res.status).toBe(404);
    expect(res.json.error.code).toBe("NOT_FOUND");
  });

  it("資料庫發生非預期錯誤時回 500，且不外洩內部訊息", async () => {
    await api.db.prepare("DROP TABLE messages").run();
    const res = await api.call("GET", "/messages");
    expect(res.status).toBe(500);
    expect(res.json.error).toEqual({ code: "INTERNAL_ERROR", message: "伺服器發生錯誤" });
  });
});
