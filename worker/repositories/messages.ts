import type { AdminMessage, MessageRow, MessageStatus, PublicMessage } from "../types";

type Page<T> = { items: T[]; nextCursor: number | null };

const toPublic = (row: MessageRow): PublicMessage => ({
  id: row.id,
  name: row.name,
  content: row.content,
  createdAt: row.created_at,
});

const toAdmin = (row: MessageRow): AdminMessage => ({ ...toPublic(row), status: row.status });

/**
 * 留言的資料存取。所有 SQL 都用參數綁定，路由層不直接碰資料庫。
 * 分頁用 id 游標（keyset），資料量變大時不會像 OFFSET 一樣越翻越慢，也不會因新留言插入而重複或漏列。
 */
export function messageRepository(db: D1Database) {
  async function listByStatus(
    status: MessageStatus,
    limit: number,
    cursor: number | null,
  ): Promise<Page<MessageRow>> {
    // 多取一筆用來判斷是否還有下一頁
    const { results } = await db
      .prepare(
        `SELECT id, name, content, status, visitor_hash, created_at
           FROM messages
          WHERE status = ?1 AND (?2 IS NULL OR id < ?2)
          ORDER BY id DESC
          LIMIT ?3`,
      )
      .bind(status, cursor, limit + 1)
      .all<MessageRow>();

    const items = results.slice(0, limit);
    return { items, nextCursor: results.length > limit ? items[items.length - 1].id : null };
  }

  return {
    async listApproved(limit: number, cursor: number | null): Promise<Page<PublicMessage>> {
      const page = await listByStatus("approved", limit, cursor);
      return { items: page.items.map(toPublic), nextCursor: page.nextCursor };
    },

    async listForAdmin(
      status: MessageStatus,
      limit: number,
      cursor: number | null,
    ): Promise<Page<AdminMessage>> {
      const page = await listByStatus(status, limit, cursor);
      return { items: page.items.map(toAdmin), nextCursor: page.nextCursor };
    },

    async countRecentByVisitor(visitorHash: string, sinceIso: string): Promise<number> {
      const row = await db
        .prepare(`SELECT COUNT(*) AS total FROM messages WHERE visitor_hash = ?1 AND created_at >= ?2`)
        .bind(visitorHash, sinceIso)
        .first<{ total: number }>();
      return row?.total ?? 0;
    },

    async create(input: { name: string; content: string; visitorHash: string }): Promise<AdminMessage> {
      const row = await db
        .prepare(
          `INSERT INTO messages (name, content, visitor_hash)
           VALUES (?1, ?2, ?3)
           RETURNING id, name, content, status, visitor_hash, created_at`,
        )
        .bind(input.name, input.content, input.visitorHash)
        .first<MessageRow>();
      if (!row) throw new Error("新增留言後沒有取得資料列");
      return toAdmin(row);
    },

    async updateStatus(id: number, status: MessageStatus): Promise<AdminMessage | null> {
      const row = await db
        .prepare(
          `UPDATE messages SET status = ?2 WHERE id = ?1
           RETURNING id, name, content, status, visitor_hash, created_at`,
        )
        .bind(id, status)
        .first<MessageRow>();
      return row ? toAdmin(row) : null;
    },

    async remove(id: number): Promise<boolean> {
      const result = await db.prepare(`DELETE FROM messages WHERE id = ?1`).bind(id).run();
      return result.meta.changes > 0;
    },
  };
}
