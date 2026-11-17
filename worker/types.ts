export type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
  /** 管理端點的 Bearer token；未設定時管理端點一律回 503 */
  ADMIN_TOKEN?: string;
};

export type AppEnv = { Bindings: Env; Variables: { visitorHash: string } };

export const MESSAGE_STATUSES = ["pending", "approved", "rejected"] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

/** 資料庫列 */
export type MessageRow = {
  id: number;
  name: string;
  content: string;
  status: MessageStatus;
  visitor_hash: string;
  created_at: string;
};

/** 公開 API 回傳的留言：不含狀態與訪客雜湊 */
export type PublicMessage = { id: number; name: string; content: string; createdAt: string };

/** 管理 API 回傳的留言 */
export type AdminMessage = PublicMessage & { status: MessageStatus };
