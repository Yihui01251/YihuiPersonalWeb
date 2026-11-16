import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base 預設為根路徑（Cloudflare Pages）；GitHub Pages 部署時以 --base=/YihuiPersonalWeb/ 覆寫
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: false,
  },
});
