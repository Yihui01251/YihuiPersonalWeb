import { useCallback, useEffect, useState } from "react";

// 游標分頁的留言列表：loader 回傳 Result，這裡只負責累加項目與追蹤狀態
// status: loading | ready | error
export function useMessageList(loader) {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const apply = useCallback((result, cursor) => {
    if (!result.ok) {
      if (result.error.code === "ABORTED") return;
      setError(result.error);
      setStatus("error");
      return;
    }
    setItems((current) => (cursor ? [...current, ...result.data] : result.data));
    setNextCursor(result.nextCursor);
    setError(null);
    setStatus("ready");
  }, []);

  // 第一頁：初始狀態已是 loading，這裡只在請求完成後更新
  useEffect(() => {
    const controller = new AbortController();
    loader({ cursor: null, signal: controller.signal }).then((result) => apply(result, null));
    return () => controller.abort();
  }, [loader, apply]);

  const loadMore = useCallback(async () => {
    setStatus("loading");
    apply(await loader({ cursor: nextCursor }), nextCursor);
  }, [loader, apply, nextCursor]);
  const removeItem = useCallback(
    (id) => setItems((current) => current.filter((item) => item.id !== id)),
    [],
  );

  return { items, status, error, hasMore: nextCursor !== null, loadMore, removeItem };
}
