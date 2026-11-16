// 職涯資料：依據「專案經歷與成長脈絡（2026-11 定稿版）」
export const company = "凌群電腦股份有限公司";
export const jobTitle = "軟體工程師（前端）";

export const certifications = [
  { name: "AZ-900：Microsoft Azure Fundamentals", issuer: "Microsoft" },
  { name: "Introduction to agent skills", issuer: "Anthropic（結業證書）" },
  { name: "Claude Code in Action", issuer: "Anthropic" },
];

// 成長四階段；貫穿主線：實作 → 提煉 → 分享 → 制度化
export const growthStages = [
  {
    stage: "階段一",
    title: "手刻基本功與快速上手",
    period: "2024",
    points: [
      "職訓期間大量處理「資料怎麼變成畫面」，樣式與動畫都手刻",
      "小組專題「現在想打球」主要貢獻者，負責 83% 的提交",
      "入職當週自學 Vue，隨即接手既有的金融教育平台",
    ],
  },
  {
    stage: "階段二",
    title: "交付者",
    period: "2025 上半年",
    points: [
      "Channel+ 前台從第一筆提交開始由我開發",
      "金融教育平台與運動資料庫以功能開發和除錯為主",
      "開始做內部技術分享（SASS 7-1 架構、Nuxt 3 SSR 資料取得）",
    ],
  },
  {
    stage: "階段三",
    title: "架構者",
    period: "2025 下半年",
    points: [
      "把 Channel+ 累積的模式（API Layer、分層）帶回運動資料庫，完成重構",
      "用 TypeScript 契約與 Gherkin 情境測試約束 AI 產出的程式碼",
      "參加 JSDC 2025 印證做法，12 月把方法論整理成團隊分享",
    ],
  },
  {
    stage: "階段四",
    title: "團隊基礎建設與售前評估",
    period: "2026",
    points: [
      "把規範做成能自動執行的機制：AI 文件同步、GitLab CI 的 AI 審查、Claude Code Plugin",
      "負責人天估算、標案範圍定案與產品 Story 文件",
      "處理的問題延伸到政府網站合規面：CSP、WAF、無障礙 AA、SEO",
    ],
  },
];

// 技術分享與影響力：依時間排列的事實
export const sharingTimeline = [
  { date: "2025.02 — 03", text: "內部分享 SASS 7-1 架構、Nuxt 3 SSR 資料取得" },
  { date: "2025.10", text: "派新進同事協助運動資料庫切版，讓他熟悉 Vue 與 Vuetify" },
  { date: "2025.11", text: "參加 JSDC 2025（參加者）" },
  {
    date: "2025.12",
    text: "團隊分享「AI 協作時代的前端戰略」（14 頁），並建議同事替他負責的後台補測試",
  },
  {
    date: "2026.01 — 06",
    text: "該同事陸續補強型別與錯誤處理，後續主動撰寫設計文件、建立測試基礎建設，完成 TypeScript 遷移與 axios 職責分離",
  },
];

export const talkOutline = [
  "AI 加速開發，也帶來 Vibe Coding 的品質風險；工程師從「程式碼打字員」轉為「品質架構師」",
  "AI 協作的三層約束：Interface First（資料、視覺、上下文三層介面）、Clean Code（程式碼異味與重構）、TDD 新流程（人先定義情境，AI 再實作）",
  "完整實作流程：從 AGENTS.md 開始，一路到程式碼審查",
];

// AI 工具演進
export const aiTimeline = [
  { period: "2025", tools: "ChatGPT；年底開始使用 OpenAI Codex", note: "運動資料庫加入 codex.config.json" },
  { period: "2026.01 — 03", tools: "Gemini、Antigravity", note: "ai-docs 串接 OpenAI API" },
  { period: "2026.04 起", tools: "Claude Code", note: "GitLab MR 規範、Plugin、Tester 與 Verifier subagent" },
];
