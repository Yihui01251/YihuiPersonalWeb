import { afterEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "./client";

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

afterEach(() => vi.unstubAllGlobals());

describe("apiRequest：所有結果都收斂成 Result", () => {
  it("成功時回傳資料與下一頁游標", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json(200, { data: [1], nextCursor: 7 })));
    expect(await apiRequest("/messages")).toEqual({ ok: true, data: [1], nextCursor: 7 });
  });

  it("API 錯誤時帶回後端的錯誤代碼與欄位訊息", async () => {
    const error = { code: "VALIDATION_FAILED", message: "欄位內容不符合規則", fields: { name: "請填寫稱呼" } };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json(400, { error })));
    expect(await apiRequest("/messages", { method: "POST", body: {} })).toEqual({ ok: false, error });
  });

  it("網路中斷時不丟例外", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    const result = await apiRequest("/messages");
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe("NETWORK_ERROR");
  });

  it("靜態主機把 /api 回成 HTML 時，視為後端不存在", async () => {
    const html = new Response("<!doctype html>", { status: 200, headers: { "Content-Type": "text/html" } });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(html));
    expect((await apiRequest("/messages")).error.code).toBe("API_UNAVAILABLE");
  });

  it("有 body 時送出 JSON，有憑證時帶 Authorization", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(200, { data: null }));
    vi.stubGlobal("fetch", fetchMock);
    await apiRequest("/admin/messages/1", { method: "PATCH", body: { status: "approved" }, token: "t" });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/admin/messages/1");
    expect(init.headers).toEqual({ "Content-Type": "application/json", Authorization: "Bearer t" });
    expect(init.body).toBe('{"status":"approved"}');
  });
});
