export function viewRepository(db: D1Database) {
  return {
    /** 主鍵去重：同一訪客同一天重複瀏覽不會新增資料列。回傳這次是否被計入。 */
    async record(projectId: string, day: string, visitorHash: string): Promise<boolean> {
      const result = await db
        .prepare(
          `INSERT OR IGNORE INTO project_views (project_id, day, visitor_hash) VALUES (?1, ?2, ?3)`,
        )
        .bind(projectId, day, visitorHash)
        .run();
      return result.meta.changes > 0;
    },

    async countAll(): Promise<Record<string, number>> {
      const { results } = await db
        .prepare(`SELECT project_id, COUNT(*) AS views FROM project_views GROUP BY project_id`)
        .all<{ project_id: string; views: number }>();
      return Object.fromEntries(results.map((row) => [row.project_id, row.views]));
    },
  };
}
