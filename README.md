# 詹怡慧的個人作品集

React 18、Vite、SCSS 開發的個人網站，內容由 `src/data` 的資料檔驅動，新增作品或筆記不需要改動版面。

## 開發

```bash
npm install
npm run dev
```

| 指令 | 用途 |
|---|---|
| `npm run dev` | 開發伺服器 |
| `npm run build` | 建置到 `dist` |
| `npm run lint` | ESLint（含 jsx-a11y 無障礙規則） |
| `npm test` | Vitest 單元與元件測試 |

## 目錄結構

```
src/
  data/        作品、學習紀錄、技能、職涯等內容資料與其測試
  pages/       四個頁面：首頁、關於我、作品集、學習紀錄
  component/   共用元件（頁首、頁尾、作品卡、詳情對話框、篩選器）
  styleSheet/  SCSS，以 @use 模組化
scripts/       建置腳本
fonts-src/     字型原始檔（不直接部署）
```

## 字型子集

標題字型 GenJyuuGothic 原始檔約 10 MB。`scripts/subset-font.mjs` 會在 `dev` 與 `build` 之前掃描 `src` 與 `index.html` 的實際用字，產生約 160 KB 的 woff2 子集。子集檔不進版控，內容更新後會自動重新產生。

## 部署

- 路由使用 BrowserRouter，`basename` 跟著 Vite 的 `base` 設定。
- 正式部署目標為 Cloudflare Pages（建置指令 `npm run build`，輸出目錄 `dist`）。
- GitHub Pages 仍可用 `npm run deploy:ghpages` 部署，腳本會以 `/YihuiPersonalWeb/` 為 base，並複製 `404.html` 作為 SPA fallback。

## CI

每個 PR 與 `master` 的推送都會執行 lint、測試與建置（`.github/workflows/ci.yml`）。
