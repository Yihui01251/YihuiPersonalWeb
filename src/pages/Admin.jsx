import { useCallback, useState } from "react";
import FilterTabs from "../component/FilterTabs";
import { deleteMessage, fetchAdminMessages, updateMessageStatus } from "../api/messages";
import { useMessageList } from "../hooks/useMessageList";
import { formatDate } from "../data/formatDate";

const STATUS_FILTERS = [
  { key: "pending", label: "待審核" },
  { key: "approved", label: "已公開" },
  { key: "rejected", label: "已退回" },
];

// 憑證只放在 sessionStorage：關閉分頁就清除，也不會隨請求自動送出
const TOKEN_KEY = "admin-token";
const readToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
};
const writeToken = (token) => {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // 無法使用 sessionStorage 時，憑證只留在記憶體
  }
};

const LoginForm = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <form
      className="guestbook-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
    >
      <div className="form-field">
        <label htmlFor="admin-token">管理憑證</label>
        <input
          id="admin-token"
          type="password"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">進入</button>
      </div>
    </form>
  );
};

const ModerationList = ({ token, status, onUnauthorized }) => {
  const loader = useCallback(
    ({ cursor }) => fetchAdminMessages(token, { status, cursor }),
    [token, status],
  );
  const { items, status: loadStatus, error, hasMore, loadMore, removeItem } = useMessageList(loader);
  const [actionError, setActionError] = useState("");

  // 操作成功後，該留言就不再屬於目前的狀態分頁，直接從列表移除
  const run = async (id, action) => {
    setActionError("");
    const result = await action();
    if (result.ok) removeItem(id);
    else if (result.error.code === "UNAUTHORIZED") onUnauthorized();
    else setActionError(result.error.message);
  };

  if (loadStatus === "error") {
    const unauthorized = error.code === "UNAUTHORIZED";
    return (
      <div role="alert">
        <p className="guestbook-notice">{unauthorized ? "憑證無效，請重新輸入。" : error.message}</p>
        {unauthorized && (
          <button type="button" className="btn-outline" onClick={onUnauthorized}>重新輸入憑證</button>
        )}
      </div>
    );
  }
  if (loadStatus === "loading" && items.length === 0) return <p className="guestbook-notice">載入中…</p>;
  if (items.length === 0) return <p className="guestbook-notice">這個分類沒有留言。</p>;

  return (
    <>
      {actionError && (
        <p className="guestbook-notice" role="alert">{actionError}</p>
      )}
      <ul className="message-list">
        {items.map((message) => (
          <li key={message.id} className="message-card">
            <p className="message-meta">
              <strong>{message.name}</strong>
              <time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
            </p>
            <p className="message-content">{message.content}</p>
            <div className="message-actions">
              {status !== "approved" && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => run(message.id, () => updateMessageStatus(token, message.id, "approved"))}
                >
                  核准
                </button>
              )}
              {status !== "rejected" && (
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => run(message.id, () => updateMessageStatus(token, message.id, "rejected"))}
                >
                  退回
                </button>
              )}
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  if (window.confirm(`確定永久刪除「${message.name}」的留言？`)) {
                    run(message.id, () => deleteMessage(token, message.id));
                  }
                }}
              >
                刪除
              </button>
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button type="button" className="btn-outline" onClick={loadMore}>載入更多</button>
      )}
    </>
  );
};

const Admin = () => {
  const [token, setToken] = useState(readToken);
  const [status, setStatus] = useState("pending");

  const signIn = (value) => {
    writeToken(value);
    setToken(value);
  };
  const signOut = () => signIn("");

  return (
    <main className="portfolio-page">
      <div className="portfolio-main">
        {token && <FilterTabs filters={STATUS_FILTERS} active={status} onChange={setStatus} />}
        <div className="portfolio-content guestbook">
          <h1 className="guestbook-title">留言審核</h1>
          {token ? (
            <>
              {/* key 讓切換狀態分頁時重新載入列表 */}
              <ModerationList key={status} token={token} status={status} onUnauthorized={signOut} />
              <button type="button" className="btn-outline admin-signout" onClick={signOut}>登出</button>
            </>
          ) : (
            <LoginForm onSubmit={signIn} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;
