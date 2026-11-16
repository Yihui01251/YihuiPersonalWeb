// 作品集資料：頁面只負責渲染，新增 / 修改專案只需編輯此檔
// category: frontend | fullstack | ai
// links: 僅放公開 repo / demo；公司專案不附連結
import projectImages from "../assets/images/projects";

export const PROJECT_FILTERS = [
  { key: "all", label: "全部" },
  { key: "frontend", label: "前端" },
  { key: "fullstack", label: "全端" },
  { key: "ai", label: "AI 應用" },
];

export const projects = [
  {
    id: "media-platform",
    title: "影音 / Podcast 串流平台",
    type: "公司專案",
    featured: true,
    category: ["frontend", "fullstack"],
    tech: ["Nuxt3", "Vue3", "TypeScript", "Pinia", "Nitro Server Routes", "i18n", "Vitest", "Playwright"],
    summary:
      "多語系 SSR 影音平台，涵蓋節目、單集、播放清單、線上課程與測驗、會員中心。除前端外，也以 Nuxt Server Routes 實作 RSS、Sitemap、API Proxy 與錯誤日誌等伺服器端功能。",
    highlights: [
      "以 routeRules 規劃各頁 SSR 策略；Server Routes 動態產生節目 / 課程 RSS、sitemap.xml、robots.txt",
      "實作 Server / Client 雙端結構化錯誤日誌，支援每日輪替與後台查詢頁",
      "引入 DTO / Domain + Mapper（Anti-Corruption Layer），隔離後端資料格式不一致",
      "診斷並修復 SSR 500 時序問題（Pinia / Router 掛載順序）與 useState 跨頁狀態污染",
      "無障礙 AA 級修正：快速鍵（accesskey）、字級縮放、對比度與 ARIA",
      "21 個 composables 拆分業務邏輯，32 個 Vitest 測試檔 + Playwright",
    ],
    ai: "以 Claude Code 進行根因分析與重構規劃，每次任務皆留存決策紀錄",
    image: projectImages["media-platform"],
    links: {},
  },
  {
    id: "sports-data",
    title: "運動科學數據平台",
    type: "公司專案",
    featured: true,
    category: ["frontend", "ai"],
    tech: ["Vue3", "Vite", "Vuetify3", "Pinia", "Chart.js", "Vitest", "Husky"],
    summary:
      "服務運動員、教練、運科人員與管理員的多角色數據平台，包含權限管理、問卷建立、數據批次匯入與教練儀表板。",
    highlights: [
      "RBAC：5 種角色，選單與權限由後端回傳，router guard + roleRouteMap 動態產生路由",
      "重寫 Service 層：統一 makeApiCall、攔截器與 401 / 403 / 5xx / 逾時處理流程",
      "動態問卷建立器（題型、邏輯跳題）與 Excel / CSV 批次匯入前端驗證",
      "53 個 Vitest 測試檔（unit / composables / feature steps），搭配 Husky pre-commit",
    ],
    ai: "撰寫 Copilot / Codex 專案協作設定檔，並以 ai-docs 自動產生文件同步至 Notion",
    image: projectImages["sports-data"],
    links: {},
  },
  {
    id: "ai-standards",
    title: "前端規範 × AI 協作工具鏈",
    type: "團隊工具",
    featured: true,
    category: ["ai", "fullstack"],
    tech: ["Node.js", "OpenAI API", "Notion API", "Claude Code Plugin", "GitLab CI"],
    summary:
      "為團隊建立的前端規範與 AI 協作基礎建設：把規範變成 AI 會遵守的 Skill，並把文件產生與 Code Review 自動化。",
    highlights: [
      "Pipeline：讀取 Git staged 變更 → AI 產生技術文件 + Code Review（架構 / 安全 / 效能 / A11y）",
      "Notion 同步採 block-level diff，保留同事手動加入的截圖與註解",
      "打包成 Claude Code Plugin，內含 frontend-standards-advisor Subagent，同事一鍵安裝即可諮詢規範",
      "將 16 份規範文件重構為 Agent Skill，以決策樹依任務載入對應規範",
      "GitLab CI 範本：Vitest 僅測變更檔、JUnit 報告呈現於 MR",
    ],
    ai: "本專案本身就是 AI 工作流產品，並於團隊內部分享導入方式",
    image: projectImages["ai-standards"],
    links: {},
  },
  {
    id: "ai-extension",
    title: "AI 助理瀏覽器擴充套件 PoC",
    type: "技術驗證",
    category: ["ai", "frontend"],
    tech: ["WXT", "Vue3", "TypeScript", "Tailwind CSS", "ECharts"],
    summary:
      "在不改動舊系統的前提下，以 Chrome Side Panel 擴充套件為既有案件管理系統加上 AI 輔助：智慧受理、案件解析、智庫檢索。",
    highlights: [
      "Content Script 以 Shadow DOM 注入 UI，不影響舊系統樣式",
      "點擊案件列 → 擷取資料送至 Side Panel；AI 建議可一鍵回填舊系統表單",
      "掃描未填欄位、MutationObserver 守護排序狀態",
      "逐項驗證 6 項技術假設並留存驗收紀錄",
    ],
    ai: "探索「AI 疊加在舊系統上」的整合模式",
    image: projectImages["ai-extension"],
    links: {},
  },
  {
    id: "course-matching",
    title: "課程媒合及管理資訊系統",
    type: "公司專案",
    category: ["frontend"],
    tech: ["Vue3", "Vuetify3", "Pinia", "vue-i18n", "jsPDF"],
    summary:
      "連結課程供應方與需求方的媒合平台，包含雙角色後台、媒合條件設定、課程申請與審核、公告與 FAQ。",
    highlights: [
      "供應方 / 需求方雙後台，依角色切換側欄與可操作功能",
      "媒合因子編輯與預覽、自訂課程申請流程",
      "html2canvas + jsPDF 產生可下載的報表 PDF",
      "68 個 Vue 元件，抽出分頁、Loading、Sidebar 等共用元件",
    ],
    image: projectImages["course-matching"],
    links: {},
  },
  {
    id: "survey-platform",
    title: "問卷調查與課程管理平台",
    type: "公司專案",
    category: ["frontend"],
    tech: ["Vue3", "Pinia", "Chart.js", "chartjs-chart-geo", "PapaParse", "jsPDF"],
    summary: "問卷 / 測驗建立、填答與結果分析平台，結果可視化並可匯出。",
    highlights: [
      "分步驟（Stepper）建立問卷、測驗與課程，支援公版題目",
      "結果以長條圖與地理分布圖（Choropleth）呈現",
      "CSV 解析與 PDF 表格匯出",
      "修復建立問卷時舊草稿與模組參考污染導致的 API 500",
    ],
    image: projectImages["survey-platform"],
    links: {},
  },
  {
    id: "knowledge-base",
    title: "AI 協作知識庫",
    type: "個人專案",
    category: ["ai"],
    tech: ["Obsidian", "Git", "Node.js", "YAML Frontmatter"],
    summary:
      "把每次與 AI 協作的工程任務結構化存檔，累積成可檢索的個人知識庫，也是我反思 AI 使用方式的依據。",
    highlights: [
      "100+ 份 AI 協作紀錄，以 frontmatter 標記類型、技術棧、難度與角色",
      "Dataview 索引依技術棧 / 時序 / 類型檢視；腳本驗證 frontmatter 格式",
      "Lessons Learned：記錄 AI 協作中踩過的坑與流程修正",
    ],
    image: projectImages["knowledge-base"],
    links: {},
  },
  {
    id: "play-ball-now",
    title: "現在想打球",
    type: "個人作品",
    category: ["frontend"],
    tech: ["React (CDN)", "Sass", "JavaScript"],
    summary: "為羽球 / 排球愛好者設計的揪團報名網站。",
    highlights: [
      "多重標籤篩選貼文、縣市 / 地區連動選單",
      "報名狀態判斷、團主與球友雙向回饋、行程管理",
    ],
    image: projectImages["play-ball-now"],
    links: { github: "https://github.com/Yihui01251/Topic_PlayBallNow" },
  },
  {
    id: "personal-site",
    title: "個人作品集網站",
    type: "個人作品",
    category: ["frontend"],
    tech: ["React", "React Router", "SCSS"],
    summary: "就是這個網站。內容與畫面分離，專案、筆記、技能皆由 data 檔驅動。",
    highlights: ["元件化頁面 + 資料檔驅動，新增作品不需改動版面"],
    image: projectImages["personal-site"],
    links: { github: "https://github.com/Yihui01251/YihuiPersonalWeb" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
