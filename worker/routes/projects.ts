import { Hono } from "hono";
import { PROJECT_IDS } from "../../shared/projectIds.js";
import { ApiError } from "../lib/errors";
import { todayUtc } from "../lib/crypto";
import { withVisitor } from "../lib/middleware";
import { viewRepository } from "../repositories/views";
import type { AppEnv } from "../types";

export const projects = new Hono<AppEnv>();

projects.get("/views", async (c) => {
  const counts = await viewRepository(c.env.DB).countAll();
  // 瀏覽數不需要即時，讓瀏覽器短暫快取，減少資料庫讀取
  c.header("Cache-Control", "public, max-age=60");
  return c.json({ data: counts });
});

projects.post("/:id/views", withVisitor, async (c) => {
  const id = c.req.param("id");
  if (!PROJECT_IDS.includes(id)) throw new ApiError(404, "NOT_FOUND", "找不到這件作品");

  const counted = await viewRepository(c.env.DB).record(id, todayUtc(), c.get("visitorHash"));
  return c.json({ data: { counted } });
});
