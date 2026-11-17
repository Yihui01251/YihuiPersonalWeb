import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base 預設為根路徑（Cloudflare）；GitHub Pages 部署時以 --base=/YihuiPersonalWeb/ 覆寫
export default defineConfig({
  plugins: [react()],
  server: {
    // 開發時 /api 轉給本機的 Worker（npm run dev:api）
    proxy: { "/api": "http://localhost:8787" },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "web",
          environment: "jsdom",
          include: ["src/**/*.test.{js,jsx}"],
          setupFiles: ["./src/test/setup.js"],
          css: false,
        },
      },
      {
        test: {
          name: "api",
          environment: "node",
          include: ["worker/**/*.test.ts"],
          testTimeout: 20000,
        },
      },
    ],
  },
});
