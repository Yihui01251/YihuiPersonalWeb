import React from "react";

// Figma「btn/文章分類」：青色分頁，選中時與內容區同色
const FilterTabs = ({ filters, active, onChange }) => (
  <div className="portfolio-filters" role="group" aria-label="分類篩選">
    {filters.map((f) => (
      <button
        key={f.key}
        type="button"
        className={`filter-btn ${active === f.key ? "filter-btn--active" : ""}`}
        aria-pressed={active === f.key}
        onClick={() => onChange(f.key)}
      >
        {f.label}
      </button>
    ))}
  </div>
);

export default FilterTabs;
