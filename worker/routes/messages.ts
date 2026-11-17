import { Hono } from "hono";
import { ApiError } from "../lib/errors";
import { readJson, requireJson, withVisitor } from "../lib/middleware";
import { parseLimit, parseMessageInput, parsePositiveInt } from "../lib/validation";
import { messageRepository } from "../repositories/messages";
import type { AppEnv } from "../types";

export const RATE_LIMIT = { max: 3, windowMs: 60 * 60 * 1000 };
const PAGE_SIZE = { fallback: 10, max: 50 };

export const messages = new Hono<AppEnv>();

messages.get("/", async (c) => {
  const limit = parseLimit(c.req.query("limit"), PAGE_SIZE.fallback, PAGE_SIZE.max);
  const cursor = parsePositiveInt(c.req.query("cursor"));
  const page = await messageRepository(c.env.DB).listApproved(limit, cursor);
  return c.json({ data: page.items, nextCursor: page.nextCursor });
});

messages.post("/", requireJson, withVisitor, async (c) => {
  const body = (await readJson(c.req)) as Record<string, unknown> | null;

  // 蜜罐欄位：表單裡對人隱藏，只有自動填表的機器人會填。回覆成功但不寫入，不讓對方知道被擋下
  if (body && typeof body.website === "string" && body.website.trim() !== "") {
    return c.json({ data: { status: "pending" } }, 201);
  }

  const input = parseMessageInput(body);
  const repo = messageRepository(c.env.DB);
  const visitorHash = c.get("visitorHash");

  const since = new Date(Date.now() - RATE_LIMIT.windowMs).toISOString();
  if ((await repo.countRecentByVisitor(visitorHash, since)) >= RATE_LIMIT.max) {
    c.header("Retry-After", String(RATE_LIMIT.windowMs / 1000));
    throw new ApiError(429, "RATE_LIMITED", "留言太頻繁，請稍後再試");
  }

  const created = await repo.create({ ...input, visitorHash });
  // 新留言需審核後才公開，所以只回狀態，不回完整資料
  return c.json({ data: { id: created.id, status: created.status } }, 201);
});
