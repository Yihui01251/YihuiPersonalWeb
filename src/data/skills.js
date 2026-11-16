// 技能與 AI 工具：首頁與關於我共用同一份資料
export const skillGroups = [
  {
    key: "frontend",
    label: "前端（主力）",
    items: ["Vue3", "Nuxt3", "TypeScript", "JavaScript", "Pinia", "Vuetify", "Vite", "SCSS", "Tailwind CSS", "React"],
  },
  {
    key: "backend",
    label: "後端（延伸中）",
    items: ["Node.js", "Nuxt Server Routes (Nitro)", "REST API"],
  },
  {
    key: "quality",
    label: "測試 / 品質",
    items: ["Vitest", "Playwright", "Gherkin", "ESLint / Prettier", "Husky", "GitLab CI", "A11y (WCAG AA)", "CSP"],
  },
  {
    key: "ai",
    label: "AI 工具",
    items: ["Claude Code", "OpenAI Codex", "OpenAI API", "ChatGPT", "Gemini", "Antigravity", "Notion API"],
  },
];

// AI 實際應用：核心觀點是用介面契約、分層、測試與 CI 門禁約束 AI 的產出，再把做法變成團隊可安裝的工具
export const aiPractices = [
  {
    tag: "核心做法",
    title: "用契約與測試約束 AI 產出",
    desc: "先用 TypeScript 契約與 Gherkin 情境定義好「對的樣子」，再讓 AI 產生測試與實作；分層架構與 CI 門禁守住品質。",
  },
  {
    tag: "Claude Code",
    title: "規範做成 Claude Code Plugin",
    desc: "把 9 份前端規範重構成 AI Agent Skill 並加上決策樹調度，打包成 Plugin Marketplace，同事一鍵安裝。",
  },
  {
    tag: "GitLab CI",
    title: "AI Code Review 接進流水線",
    desc: "測試強制通過後才做 AI MR Code Review；以 Tag 發版到 Package Registry 讓各專案拉取。",
  },
  {
    tag: "OpenAI API",
    title: "ai-docs 文件同步 Notion",
    desc: "依 Git 暫存的變更產生技術文件，以 block-level diff 同步到 Notion，保留同事手動加的截圖。",
  },
];
