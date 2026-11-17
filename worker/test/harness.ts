import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { getPlatformProxy } from "wrangler";
import app from "../index";
import type { Env } from "../types";

const MIGRATIONS_DIR = join(import.meta.dirname, "../../migrations");
export const ADMIN_TOKEN = "test-admin-token";

/**
 * 測試用的是 wrangler 在本機提供的真實 D1（底層是 SQLite），並套用正式的 migration 檔。
 * 所以 SQL 語法、CHECK 條件、索引與主鍵去重都會被實際執行，而不是被 mock 掉。
 */
let proxy: Awaited<ReturnType<typeof getPlatformProxy<Env>>> | undefined;

async function resetDatabase(db: D1Database) {
  const { results } = await db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%'")
    .all<{ name: string }>();
  for (const { name } of results) await db.prepare(`DROP TABLE "${name}"`).run();

  const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const sql = await readFile(join(MIGRATIONS_DIR, file), "utf8");
    const statements = sql
      .replace(/^\s*--.*$/gm, "")
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    await db.batch(statements.map((s) => db.prepare(s)));
  }
}

export async function disposeTestApi() {
  await proxy?.dispose();
  proxy = undefined;
}

/** 每個測試都從剛套完 migration 的空資料庫開始 */
export async function createTestApi() {
  proxy ??= await getPlatformProxy<Env>({ persist: false });
  const db = proxy.env.DB;
  await resetDatabase(db);

  const env = { DB: db, ADMIN_TOKEN } as Env;

  type Options = { body?: unknown; ip?: string; token?: string; headers?: Record<string, string> };

  async function call(method: string, path: string, options: Options = {}) {
    const headers: Record<string, string> = { "CF-Connecting-IP": options.ip ?? "203.0.113.1" };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    if (options.token) headers.Authorization = `Bearer ${options.token}`;
    Object.assign(headers, options.headers);

    const res = await app.request(
      `/api${path}`,
      {
        method,
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
      },
      env,
    );
    const text = await res.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { status: res.status, headers: res.headers, json: (text ? JSON.parse(text) : null) as any };
  }

  return { call, db, env };
}

export type TestApi = Awaited<ReturnType<typeof createTestApi>>;
