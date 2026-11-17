const encoder = new TextEncoder();

async function sha256(input: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(input)));
}

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

export const todayUtc = (now = new Date()) => now.toISOString().slice(0, 10);

/**
 * 訪客雜湊：IP 加上日期與伺服器端密鑰後做 SHA-256。
 * 資料庫不保存 IP；日期入鹽讓同一訪客跨日無法被串連。
 */
export async function hashVisitor(ip: string, secret: string, day = todayUtc()): Promise<string> {
  return toHex(await sha256(`${day}:${secret}:${ip}`)).slice(0, 32);
}

/** 先各自雜湊成固定長度再逐位元組比較，比較時間不隨輸入內容或長度變化 */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [x, y] = await Promise.all([sha256(a), sha256(b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i += 1) diff |= x[i] ^ y[i];
  return diff === 0;
}
