import { useState } from "react";
import ProfileSidebar from "../component/ProfileSidebar";
import { fetchMessages, submitMessage } from "../api/messages";
import { useMessageList } from "../hooks/useMessageList";
import { formatDate } from "../data/formatDate";
import { MESSAGE_RULES } from "../../shared/messageRules.js";

const EMPTY_FORM = { name: "", content: "", website: "" };
const charLength = (value) => [...value.trim()].length;

// 和後端 worker/lib/validation.ts 同一組規則；前端先擋一次是為了即時回饋，後端仍會再驗證
const validate = ({ name, content }) => {
  const fields = {};
  if (charLength(name) === 0) fields.name = "請填寫稱呼";
  else if (charLength(name) > MESSAGE_RULES.nameMax) fields.name = `稱呼最多 ${MESSAGE_RULES.nameMax} 個字`;
  if (charLength(content) === 0) fields.content = "請填寫留言內容";
  else if (charLength(content) > MESSAGE_RULES.contentMax)
    fields.content = `留言最多 ${MESSAGE_RULES.contentMax} 個字`;
  return fields;
};

const MessageForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  // idle | submitting | success | error
  const [state, setState] = useState({ status: "idle", message: "" });

  const update = (key) => (e) => {
    setForm((current) => ({ ...current, [key]: e.target.value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setState({ status: "submitting", message: "" });
    const result = await submitMessage(form);

    if (!result.ok) {
      setFieldErrors(result.error.fields ?? {});
      setState({ status: "error", message: result.error.message });
      return;
    }
    setForm(EMPTY_FORM);
    setState({ status: "success", message: "已收到你的留言，審核通過後就會顯示在下方。" });
  };

  const submitting = state.status === "submitting";

  return (
    <form className="guestbook-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="guestbook-name">稱呼</label>
        <input
          id="guestbook-name"
          type="text"
          autoComplete="nickname"
          maxLength={MESSAGE_RULES.nameMax}
          value={form.name}
          onChange={update("name")}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "guestbook-name-error" : undefined}
        />
        {fieldErrors.name && (
          <p id="guestbook-name-error" className="form-error">{fieldErrors.name}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="guestbook-content">留言</label>
        <textarea
          id="guestbook-content"
          rows={4}
          value={form.content}
          onChange={update("content")}
          aria-invalid={Boolean(fieldErrors.content)}
          aria-describedby={
            fieldErrors.content ? "guestbook-content-error guestbook-content-count" : "guestbook-content-count"
          }
        />
        <p id="guestbook-content-count" className="form-hint">
          {charLength(form.content)} / {MESSAGE_RULES.contentMax}
        </p>
        {fieldErrors.content && (
          <p id="guestbook-content-error" className="form-error">{fieldErrors.content}</p>
        )}
      </div>

      {/* 蜜罐欄位：對人隱藏、鍵盤與輔助科技都略過，只有自動填表的機器人會填 */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="guestbook-website">網站（請留空）</label>
        <input
          id="guestbook-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "送出中…" : "送出留言"}
        </button>
        <p className={`form-status form-status--${state.status}`} role="status">
          {state.message}
        </p>
      </div>
    </form>
  );
};

const MessageList = () => {
  const { items, status, error, hasMore, loadMore } = useMessageList(fetchMessages);

  if (status === "error" && items.length === 0) {
    return (
      <p className="guestbook-notice" role="alert">
        {error.code === "API_UNAVAILABLE" ? "留言板在這個環境無法使用。" : error.message}
      </p>
    );
  }
  if (status === "loading" && items.length === 0) {
    return <p className="guestbook-notice">留言載入中…</p>;
  }
  if (items.length === 0) {
    return <p className="guestbook-notice">還沒有留言，歡迎成為第一位。</p>;
  }

  return (
    <>
      <ul className="message-list">
        {items.map((message) => (
          <li key={message.id} className="message-card">
            <p className="message-meta">
              <strong>{message.name}</strong>
              <time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
            </p>
            <p className="message-content">{message.content}</p>
          </li>
        ))}
      </ul>
      {status === "error" && (
        <p className="guestbook-notice" role="alert">{error.message}</p>
      )}
      {hasMore && (
        <button type="button" className="btn-outline" onClick={loadMore} disabled={status === "loading"}>
          {status === "loading" ? "載入中…" : "載入更多"}
        </button>
      )}
    </>
  );
};

const Guestbook = () => (
  <main className="portfolio-page">
    <ProfileSidebar>
      <p>
        這一頁是網站的全端功能：React 表單、Cloudflare Workers 上的 REST API 與 D1 資料庫。
        留言會先經過審核才公開。
      </p>
    </ProfileSidebar>

    <div className="portfolio-main">
      <div className="portfolio-content guestbook">
        <h1 className="guestbook-title">留言板</h1>
        <p className="guestbook-lead">工作機會、技術交流或對網站的建議都歡迎留言。</p>
        <MessageForm />
        <h2 className="guestbook-subtitle">留言</h2>
        <MessageList />
      </div>
    </div>
  </main>
);

export default Guestbook;
