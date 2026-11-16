// 年資一律計算到「今天」，網站不需要每年手動更新
export const WORK_START = { year: 2024, month: 11 }; // 第一份前端工作：2024 年 11 月

export const getExperience = (now = new Date()) => {
  const totalMonths =
    (now.getFullYear() - WORK_START.year) * 12 + (now.getMonth() + 1 - WORK_START.month);
  const months = Math.max(totalMonths, 0);
  return { years: Math.floor(months / 12), months: months % 12 };
};

// 例：「2 年」、「1 年 6 個月」、「8 個月」
export const formatExperience = (now = new Date()) => {
  const { years, months } = getExperience(now);
  if (years === 0) return `${months} 個月`;
  return months === 0 ? `${years} 年` : `${years} 年 ${months} 個月`;
};

export const workStartLabel = `${WORK_START.year}.${String(WORK_START.month).padStart(2, "0")}`;
