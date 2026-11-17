// API 回傳 UTC 時間，畫面一律以台北時間顯示日期
const formatter = new Intl.DateTimeFormat("zh-TW", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const formatDate = (iso) => formatter.format(new Date(iso));
