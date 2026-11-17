import { MESSAGE_RULES } from "../../shared/messageRules.js";
import { ApiError } from "./errors";
import { MESSAGE_STATUSES, type MessageStatus } from "../types";

export type MessageInput = { name: string; content: string };

// 控制字元（換行與 tab 除外）沒有顯示用途，只會被拿來干擾版面
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const clean = (value: unknown) =>
  typeof value === "string" ? value.replace(CONTROL_CHARS, "").trim() : "";

/** 長度以字元（code point）計，和資料庫的 length() 一致，中文與 emoji 不會被多算 */
const charLength = (value: string) => [...value].length;

export function parseMessageInput(body: unknown): MessageInput {
  const source = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const name = clean(source.name).replace(/\s+/g, " ");
  const content = clean(source.content);
  const fields: Record<string, string> = {};

  if (!name) fields.name = "請填寫稱呼";
  else if (charLength(name) > MESSAGE_RULES.nameMax)
    fields.name = `稱呼最多 ${MESSAGE_RULES.nameMax} 個字`;

  if (!content) fields.content = "請填寫留言內容";
  else if (charLength(content) > MESSAGE_RULES.contentMax)
    fields.content = `留言最多 ${MESSAGE_RULES.contentMax} 個字`;

  if (Object.keys(fields).length > 0) {
    throw new ApiError(400, "VALIDATION_FAILED", "欄位內容不符合規則", fields);
  }
  return { name, content };
}

export function parseStatus(value: unknown): MessageStatus {
  if (typeof value === "string" && (MESSAGE_STATUSES as readonly string[]).includes(value)) {
    return value as MessageStatus;
  }
  throw new ApiError(400, "VALIDATION_FAILED", "status 必須是 pending、approved 或 rejected");
}

/** 路徑或查詢字串中的正整數 id；格式不對時回傳 null，由呼叫端決定回 400 或 404 */
export function parsePositiveInt(value: string | undefined): number | null {
  if (!value || !/^[1-9]\d{0,14}$/.test(value)) return null;
  return Number(value);
}

export function parseLimit(value: string | undefined, fallback: number, max: number): number {
  const parsed = parsePositiveInt(value);
  return parsed === null ? fallback : Math.min(parsed, max);
}
