// 統一的 API 呼叫層：所有請求都回傳 Result，不丟例外
//   成功 { ok: true, data, nextCursor }
//   失敗 { ok: false, error: { code, message, fields? } }
// 呼叫端必須先檢查 ok 才能取資料，網路錯誤、非 JSON 回應與 API 錯誤都走同一條路徑處理

const NETWORK_ERROR = { code: "NETWORK_ERROR", message: "無法連線到伺服器，請稍後再試" };
// 靜態主機（例如 GitHub Pages）沒有後端，/api 會回 HTML 或 404
const UNAVAILABLE = { code: "API_UNAVAILABLE", message: "這個環境沒有提供後端服務" };

export async function apiRequest(path, { method = "GET", body, token, signal } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (cause) {
    if (cause?.name === "AbortError") return { ok: false, error: { code: "ABORTED", message: "" } };
    return { ok: false, error: NETWORK_ERROR };
  }

  if (response.status === 204) return { ok: true, data: null, nextCursor: null };

  const isJson = (response.headers.get("Content-Type") ?? "").includes("application/json");
  if (!isJson) return { ok: false, error: UNAVAILABLE };

  let payload;
  try {
    payload = await response.json();
  } catch {
    return { ok: false, error: UNAVAILABLE };
  }

  if (!response.ok) {
    return { ok: false, error: payload?.error ?? { code: "UNKNOWN", message: "發生未知的錯誤" } };
  }
  return { ok: true, data: payload.data, nextCursor: payload.nextCursor ?? null };
}
