// 工作亮點：首頁「核心特質」與關於我「工作亮點」共用
// summary 用於首頁一句話摘要；points 為關於我頁的具體佐證
// 依據「專案經歷與成長脈絡（2026-11 定稿版）」：只寫查得到或能口頭說明的事實
export const strengths = [
  {
    title: "快速上手與獨立交付",
    summary: "入職當週自學 Vue 並接手開發中的專案；Channel+ 前台從第一筆提交起獨立開發。",
    points: [
      "入職當週自學 Vue、補齊 Vuetify 與 API 串接，接手開發中的專案並提前完成進度",
      "Channel+ 前台從第一筆提交起由我開發，同時維護 1–2 個專案",
      "課程媒合系統接手後獨立負責前台",
    ],
  },
  {
    title: "架構思維與程式品質",
    summary: "主導運動資料庫重構：可注入 adapter 讓 axios 與框架解耦、Result Pattern 統一錯誤處理、三層架構與 60 個測試檔。",
    points: [
      "以可注入的 loading / auth adapter 讓 axios 和 Vue、Pinia 解耦",
      "TypeScript Result Pattern（Success<T> | Failure<E>）強制呼叫端先處理錯誤",
      "View、Composable、Service 三層；60 個測試檔，以 Gherkin 先定義情境",
      "Channel+ 以 DTO、Domain + Mapper 建立 Anti-Corruption Layer",
    ],
  },
  {
    title: "政府網站合規與正式環境問題",
    summary: "處理 SSR 500、Hydration、WAF 誤判等正式環境問題，並落實 CSP、無障礙 AA、SEO 與雙端錯誤日誌。",
    points: [
      "WAF 誤判 Nuxt Icon 批次請求：從前端源頭不再發出請求，而不是要求放寬規則",
      "收緊 CSP：移除內嵌 script 與 javascript: 連結，Vuetify 主題帶 nonce",
      "無障礙 AA（ARIA、accesskey、字級調整）、sitemap 與 robots",
      "Server 與 Client 雙端結構化錯誤日誌，每日輪替",
    ],
  },
  {
    title: "把規範變成團隊工具",
    summary: "發現口頭影響不夠穩定，就把規範做成自動執行的機制：AI 文件同步、CI 的 AI 審查、Claude Code Plugin。",
    points: [
      "建立團隊前端規範 repo，打包成 Claude Code Plugin 供同事一鍵安裝",
      "GitLab CI：測試強制通過後才做 AI MR Code Review",
      "ai-docs：把技術文件以 block-level diff 自動同步到 Notion",
    ],
  },
  {
    title: "技術分享與售前評估",
    summary: "定期主持內部技術分享，讓同事建立概念、願意主動去做；也負責標案人天估算與產品 Story 文件。",
    points: [
      "內部分享：SASS 7-1 架構、Nuxt 3 SSR 資料取得、AI 協作時代的前端戰略",
      "分享後建議同事為負責的後台補測試，他之後主動建立測試基礎建設並完成 TypeScript 遷移",
      "負責標案人天估算、範圍定案與產品 Story 文件",
    ],
  },
];
