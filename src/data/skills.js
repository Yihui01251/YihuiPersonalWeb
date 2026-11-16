// 技能與 AI 工具：首頁與關於我共用同一份資料
export const skillGroups = [
  {
    key: "frontend",
    label: "前端（主力）",
    items: ["Vue3", "Nuxt3", "TypeScript", "JavaScript", "Pinia", "Vuetify", "Vite", "SCSS", "Tailwind CSS", "React"],
  },
  {
    key: "backend",
    label: "後端 / 全端",
    items: ["Node.js", "Nuxt Server Routes (Nitro)", "REST API", "C#"],
  },
  {
    key: "quality",
    label: "測試 / 品質",
    items: ["Vitest", "Playwright", "ESLint / Prettier", "Husky", "GitLab CI", "A11y (WCAG AA)"],
  },
  {
    key: "ai",
    label: "AI 工具",
    items: ["Claude Code", "GitHub Copilot", "OpenAI API", "Codex", "Notion API"],
  },
];

// AI 實際應用：每一項都對應到作品集中的專案
export const aiPractices = [
  {
    tag: "Claude Code",
    title: "把團隊規範變成 AI 會遵守的 Skill",
    desc: "將 16 份前端規範重構為 Agent Skill，並打包成 Claude Code Plugin，同事一鍵安裝即可讓 AI 依規範協助開發。",
  },
  {
    tag: "OpenAI API",
    title: "AI Code Review 與文件自動化",
    desc: "以 Node.js 串接 OpenAI 與 Notion API：依 staged 變更自動產生技術文件與 Code Review，同步至團隊 Notion。",
  },
  {
    tag: "知識管理",
    title: "AI 協作，但留下可追溯的紀錄",
    desc: "100+ 份工程任務紀錄，記下根因分析與決策過程；並持續整理 AI 協作踩坑的 Lessons Learned。",
  },
];
