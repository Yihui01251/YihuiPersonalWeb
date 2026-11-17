import { describe, it, expect } from "vitest";
import { PROJECT_FILTERS, projects, featuredProjects } from "./projects";
import { NOTE_FILTERS, NOTE_TYPES, notes } from "./notes";
import { PROJECT_IDS } from "../../shared/projectIds.js";

// 頁面完全由資料檔驅動，資料寫錯不會報錯只會默默少一張卡，所以用測試守住
describe("作品資料", () => {
  const filterKeys = PROJECT_FILTERS.map((f) => f.key);

  it("id 不重複", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("和後端接受的作品 id 清單一致，否則新作品的瀏覽數會記不進去", () => {
    expect(projects.map((p) => p.id).sort()).toEqual([...PROJECT_IDS].sort());
  });

  it.each(projects)("$id 具備卡片與詳情所需欄位", (project) => {
    expect(project.title).toBeTruthy();
    expect(project.summary).toBeTruthy();
    expect(project.image).toBeTruthy();
    expect(project.tech.length).toBeGreaterThan(0);
    expect(project.highlights.length).toBeGreaterThan(0);
  });

  it.each(projects)("$id 的分類都對應得到篩選器", (project) => {
    expect(project.category.length).toBeGreaterThan(0);
    project.category.forEach((c) => expect(filterKeys).toContain(c));
  });

  it("每個篩選器至少篩得出一件作品", () => {
    filterKeys
      .filter((key) => key !== "all")
      .forEach((key) => expect(projects.some((p) => p.category.includes(key))).toBe(true));
  });

  it("公司專案不附原始碼連結", () => {
    projects
      .filter((p) => p.type === "公司專案")
      .forEach((p) => expect(Object.keys(p.links)).toHaveLength(0));
  });

  it("首頁有精選專案", () => {
    expect(featuredProjects.length).toBeGreaterThan(0);
  });
});

describe("學習紀錄資料", () => {
  it("id 不重複", () => {
    const ids = notes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(notes)("「$title」的分類與類型都有定義", (note) => {
    expect(NOTE_FILTERS.map((f) => f.key)).toContain(note.category);
    expect(Object.keys(NOTE_TYPES)).toContain(note.type);
  });
});
