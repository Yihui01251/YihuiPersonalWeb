// GitHub Pages 沒有 SPA fallback：把 index.html 複製成 404.html，讓子頁重新整理時仍由前端路由接手
import { copyFile } from "node:fs/promises";

await copyFile("dist/index.html", "dist/404.html");
