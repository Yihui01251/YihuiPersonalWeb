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

// AI 實際應用：團隊同事與 PM 實際採用的工作流
export const aiPractices = [
  {
    tag: "Prompt 規範",
    title: "從 API 文件生成 API Function",
    desc: "持續調校規範 prompt，餵入 API 文件即可產生符合專案 Service 層規範的 API Function。",
  },
  {
    tag: "同事採用",
    title: "交接文件模板",
    desc: "制定多個交接文件模板，同事餵程式碼就能產出統一格式的文件，縮短寫文件時間，也提高了大家寫文件的意願。",
  },
  {
    tag: "PM 回饋",
    title: "Git commit 彙整日 / 週進度",
    desc: "制定進度匯報規範：提示詞 + Git commit 自動彙整日、週進度。PM 回饋寫得很清楚，並分享給其他同事使用。",
  },
  {
    tag: "Claude Code",
    title: "把累積的 Context 做成前端 Skill",
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
