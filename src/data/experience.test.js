import { describe, it, expect } from "vitest";
import { getExperience, formatExperience } from "./experience";

// 月份參數是 0 起算：new Date(2026, 10, 1) 是 2026 年 11 月
describe("年資計算", () => {
  it("到職當月為 0 個月", () => {
    expect(getExperience(new Date(2024, 10, 15))).toEqual({ years: 0, months: 0 });
  });

  it("滿整數年時不顯示月份", () => {
    expect(formatExperience(new Date(2026, 10, 1))).toBe("2 年");
  });

  it("未滿一年時只顯示月份", () => {
    expect(formatExperience(new Date(2025, 6, 1))).toBe("8 個月");
  });

  it("年與月同時顯示", () => {
    expect(formatExperience(new Date(2026, 4, 1))).toBe("1 年 6 個月");
  });

  it("到職日之前不會出現負數", () => {
    expect(getExperience(new Date(2024, 0, 1))).toEqual({ years: 0, months: 0 });
  });
});
