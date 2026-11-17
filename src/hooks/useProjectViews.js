import { useCallback, useEffect, useState } from "react";
import { fetchProjectViews, recordProjectView } from "../api/projects";

// 作品瀏覽數：載入失敗（例如靜態主機沒有後端）時 views 維持 null，畫面就不顯示這項資訊
export function useProjectViews() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchProjectViews({ signal: controller.signal }).then((result) => {
      if (result.ok) setViews(result.data);
    });
    return () => controller.abort();
  }, []);

  const recordView = useCallback(async (id) => {
    const result = await recordProjectView(id);
    // 後端以「訪客 + 日期」去重，只有真的被計入時才更新畫面上的數字
    if (result.ok && result.data.counted) {
      setViews((current) => (current ? { ...current, [id]: (current[id] ?? 0) + 1 } : current));
    }
  }, []);

  return { views, recordView };
}
