-- 留言：新留言一律為 pending，經管理者核准後才會公開
CREATE TABLE messages (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 40),
  content      TEXT NOT NULL CHECK (length(content) BETWEEN 1 AND 500),
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  -- 訪客識別只存每日更換鹽值的雜湊，用於限流，不保存 IP
  visitor_hash TEXT NOT NULL,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 公開列表與審核列表都是「某狀態下依 id 由新到舊」
CREATE INDEX idx_messages_status_id ON messages (status, id DESC);
-- 限流查詢：某訪客在一段時間內的留言數
CREATE INDEX idx_messages_visitor_created ON messages (visitor_hash, created_at);

-- 作品瀏覽：主鍵即去重條件，同一訪客同一天對同一作品只算一次
CREATE TABLE project_views (
  project_id   TEXT NOT NULL,
  day          TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  PRIMARY KEY (project_id, day, visitor_hash)
) WITHOUT ROWID;
