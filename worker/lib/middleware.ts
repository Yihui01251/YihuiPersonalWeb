import { createMiddleware } from "hono/factory";
import { ApiError } from "./errors";
import { hashVisitor, safeEqual } from "./crypto";
import type { AppEnv } from "../types";

/** 算出訪客雜湊放進 context，供限流與瀏覽去重使用 */
export const withVisitor = createMiddleware<AppEnv>(async (c, next) => {
  // CF-Connecting-IP 由 Cloudflare 邊緣節點寫入，用戶端無法偽造；本機開發時沒有這個標頭
  const ip = c.req.header("CF-Connecting-IP") ?? "local";
  c.set("visitorHash", await hashVisitor(ip, c.env.ADMIN_TOKEN ?? "dev-secret"));
  await next();
});

/**
 * 寫入類請求必須是 JSON。
 * 跨站表單只能送出 form 或 text/plain，瀏覽器對 application/json 會先發 preflight，
 * 而這支 API 不回任何 CORS 標頭，所以這個檢查同時擋下 CSRF。
 */
export const requireJson = createMiddleware<AppEnv>(async (c, next) => {
  const type = c.req.header("Content-Type") ?? "";
  if (!type.toLowerCase().startsWith("application/json")) {
    throw new ApiError(415, "UNSUPPORTED_MEDIA_TYPE", "Content-Type 必須是 application/json");
  }
  await next();
});

export const requireAdmin = createMiddleware<AppEnv>(async (c, next) => {
  const expected = c.env.ADMIN_TOKEN;
  if (!expected) throw new ApiError(503, "ADMIN_DISABLED", "管理功能尚未啟用");

  const header = c.req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !(await safeEqual(token, expected))) {
    throw new ApiError(401, "UNAUTHORIZED", "需要有效的管理憑證");
  }
  c.header("Cache-Control", "no-store");
  await next();
});

export async function readJson(req: { json: () => Promise<unknown> }): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new ApiError(400, "VALIDATION_FAILED", "請求內容不是合法的 JSON");
  }
}
