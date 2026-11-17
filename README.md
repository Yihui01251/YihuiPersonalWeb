# 詹怡慧的個人作品集

個人網站，部署在 Cloudflare Workers。

- 前端：React 18、Vite、SCSS，內容由 `src/data` 的資料檔驅動
- 後端：Cloudflare Workers 上的 REST API（Hono、TypeScript），資料庫是 D1（SQLite）
- 全端功能：留言板（審核後公開）與作品瀏覽數

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
  api/         前端 API 層，所有請求統一回傳 Result
  hooks/       資料取得相關的 hook
  data/        作品、學習紀錄、技能、職涯等內容資料
  pages/       頁面
  component/   共用元件
  styleSheet/  SCSS，以 @use 模組化
worker/
  index.ts     API 進入點與統一的錯誤處理
  routes/      路由：messages、projects、admin
  repositories/ 資料存取，SQL 只出現在這一層
  lib/         驗證、中介層、雜湊
  test/        API 測試
migrations/    D1 資料表 migration
shared/        前後端共用的規則（留言長度、作品 id 清單）
scripts/       建置腳本
```

## 後端 API

所有回應都是 JSON。成功為 `{ data, nextCursor? }`，失敗為 `{ error: { code, message, fields? } }`。

| 方法與路徑 | 用途 |
|---|---|
| `GET /api/messages?cursor=&limit=` | 已公開的留言，游標分頁 |
| `POST /api/messages` | 送出留言，狀態為待審核 |
| `GET /api/projects/views` | 各作品瀏覽數 |
| `POST /api/projects/:id/views` | 記錄一次瀏覽，同一訪客同一天只計一次 |
| `GET /api/admin/messages?status=` | 依狀態列出留言（需憑證） |
| `PATCH /api/admin/messages/:id` | 核准或退回（需憑證） |
| `DELETE /api/admin/messages/:id` | 刪除（需憑證） |

設計上的取捨：

- **留言先審核後公開。** 公開網站上的留言板一定會遇到垃圾留言，所以新留言預設不顯示。
- **防濫用。** 每位訪客每小時最多 3 則；表單有蜜罐欄位；寫入只接受 `application/json`，瀏覽器的跨站表單送不出這種請求，等於擋下 CSRF；請求大小上限 8 KB。
- **不保存 IP。** 限流與瀏覽去重用的是「IP + 日期 + 伺服器密鑰」的雜湊，跨日無法串連同一位訪客。
- **驗證有三層。** 前端表單（即時回饋）、API（實際把關）、資料庫 CHECK 條件（最後防線），長度規則來自同一份 `shared/messageRules.js`。
- **管理端點。** 以 Bearer 憑證驗證，比對時間不隨輸入變化；伺服器沒設定憑證時整組端點停用。管理頁在 `/admin`，沒有放進導覽列。

### 本機開發

```bash
npm run dev:api
```

```bash
npm run dev
```

第一個指令會套用 migration 到本機 D1 並啟動 Worker（8787 埠），第二個是前端開發伺服器，`/api` 會轉給 Worker。管理憑證放在 `.dev.vars`（不進版控）：

```
ADMIN_TOKEN=自訂一組字串
```

### 測試

`npm test` 會跑兩組測試：

- `web`：元件與資料測試（jsdom）
- `api`：對 API 發出請求並檢查回應。資料庫是 wrangler 在本機提供的真實 D1，並套用 `migrations` 裡的正式 migration，所以 SQL、CHECK 條件與索引都會實際執行。

## 字型子集

標題字型 GenJyuuGothic 原始檔約 10 MB。`scripts/subset-font.mjs` 會在 `dev` 與 `build` 之前掃描 `src` 與 `index.html` 的實際用字，產生約 160 KB 的 woff2 子集。子集檔不進版控，內容更新後會自動重新產生。

## 部署

正式環境是 Cloudflare Workers，由 Cloudflare 連結這個 repo 自動建置。

- 建置指令：`npm run build`
- 部署指令：`npm run deploy`（先套用 D1 migration，再部署 Worker 與靜態檔）
- `wrangler.jsonc` 的 `database_id` 要填入 D1 資料庫的 ID
- 管理憑證以 secret 設定，名稱為 `ADMIN_TOKEN`

靜態檔由 Cloudflare 直接回應，只有 `/api/*` 會進到 Worker；其餘找不到的路徑回 `index.html`，由前端路由處理。

GitHub Pages 仍可用 `npm run deploy:ghpages` 部署純前端版本。那個環境沒有後端，留言板會顯示無法使用，作品瀏覽數不顯示。

## CI

每個 PR 與 `master` 的推送都會執行 lint、型別檢查、測試與建置（`.github/workflows/ci.yml`）。
