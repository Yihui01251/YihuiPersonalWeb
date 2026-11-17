// 依網站實際用到的字元，把 GenJyuuGothic（原始檔約 10 MB）裁成 woff2 子集
// 內容都放在 src 的資料檔與元件裡，所以掃描 src 與 index.html 就能涵蓋全部用字
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "fonts-src/genjyuugothic/GenJyuuGothic-Regular.ttf");
const OUTPUT = join(root, "src/assets/fonts/GenJyuuGothic-subset.woff2");
const TEXT_EXTENSIONS = new Set([".js", ".jsx", ".html"]);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(path);
      return TEXT_EXTENSIONS.has(extname(entry.name)) ? [path] : [];
    }),
  );
  return nested.flat();
}

const files = [...(await collectFiles(join(root, "src"))), join(root, "index.html")];
const contents = await Promise.all(files.map((file) => readFile(file, "utf8")));

// 基本 ASCII 一律保留，避免日後加入英數內容時缺字
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("");
const text = [...new Set(ascii + contents.join(""))].join("");

const subset = await subsetFont(await readFile(SOURCE), text, { targetFormat: "woff2" });
await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, subset);

console.log(`字型子集：${[...text].length} 個字元，${(subset.length / 1024).toFixed(0)} KB`);
