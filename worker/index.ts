import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { ApiError, errorBody } from "./lib/errors";
import { admin } from "./routes/admin";
import { messages } from "./routes/messages";
import { projects } from "./routes/projects";
import type { AppEnv } from "./types";

// wrangler.jsonc 的 run_worker_first 只把 /api/* 交給這支 Worker，其餘路徑由靜態資源直接回應
const app = new Hono<AppEnv>().basePath("/api");

app.use(
  "*",
  bodyLimit({
    maxSize: 8 * 1024,
    onError: (c) => c.json(errorBody("PAYLOAD_TOO_LARGE", "請求內容過大"), 413),
  }),
);

app.get("/health", (c) => c.json({ data: { status: "ok" } }));
app.route("/messages", messages);
app.route("/projects", projects);
app.route("/admin", admin);

app.notFound((c) => c.json(errorBody("NOT_FOUND", "找不到這個 API"), 404));

// 錯誤回應格式統一為 { error: { code, message, fields? } }
// 非預期錯誤只記錄在伺服器端，不把內部訊息回給用戶端
app.onError((err, c) => {
  if (err instanceof ApiError) {
    return c.json(errorBody(err.code, err.message, err.fields), err.status);
  }
  console.error(JSON.stringify({ level: "error", path: c.req.path, message: String(err) }));
  return c.json(errorBody("INTERNAL_ERROR", "伺服器發生錯誤"), 500);
});

export default app;
