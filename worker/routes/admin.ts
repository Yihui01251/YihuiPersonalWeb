import { Hono } from "hono";
import { ApiError } from "../lib/errors";
import { readJson, requireAdmin, requireJson } from "../lib/middleware";
import { parseLimit, parsePositiveInt, parseStatus } from "../lib/validation";
import { messageRepository } from "../repositories/messages";
import type { AppEnv } from "../types";

export const admin = new Hono<AppEnv>();

admin.use("*", requireAdmin);

admin.get("/messages", async (c) => {
  const status = parseStatus(c.req.query("status") ?? "pending");
  const limit = parseLimit(c.req.query("limit"), 20, 50);
  const cursor = parsePositiveInt(c.req.query("cursor"));
  const page = await messageRepository(c.env.DB).listForAdmin(status, limit, cursor);
  return c.json({ data: page.items, nextCursor: page.nextCursor });
});

admin.patch("/messages/:id", requireJson, async (c) => {
  const id = parsePositiveInt(c.req.param("id"));
  const body = (await readJson(c.req)) as Record<string, unknown> | null;
  const status = parseStatus(body?.status);

  const updated = id === null ? null : await messageRepository(c.env.DB).updateStatus(id, status);
  if (!updated) throw new ApiError(404, "NOT_FOUND", "找不到這則留言");
  return c.json({ data: updated });
});

admin.delete("/messages/:id", async (c) => {
  const id = parsePositiveInt(c.req.param("id"));
  const removed = id === null ? false : await messageRepository(c.env.DB).remove(id);
  if (!removed) throw new ApiError(404, "NOT_FOUND", "找不到這則留言");
  return c.body(null, 204);
});
