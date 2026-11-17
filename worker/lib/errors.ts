import type { ContentfulStatusCode } from "hono/utils/http-status";

export type ErrorCode =
  | "VALIDATION_FAILED"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "RATE_LIMITED"
  | "UNAUTHORIZED"
  | "ADMIN_DISABLED"
  | "NOT_FOUND"
  | "PAYLOAD_TOO_LARGE"
  | "INTERNAL_ERROR";

/** 所有可預期的錯誤都丟這個型別，由 index.ts 的 onError 統一轉成回應格式 */
export class ApiError extends Error {
  constructor(
    readonly status: ContentfulStatusCode,
    readonly code: ErrorCode,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
  }
}

export const errorBody = (code: ErrorCode, message: string, fields?: Record<string, string>) => ({
  error: { code, message, ...(fields ? { fields } : {}) },
});
