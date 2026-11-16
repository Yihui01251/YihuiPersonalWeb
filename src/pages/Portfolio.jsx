import { useState } from "react";
import ProfileSidebar from "../component/ProfileSidebar";
import FilterTabs from "../component/FilterTabs";
import ProjectGallery from "../component/ProjectGallery";
import { PROJECT_FILTERS, projects } from "../data/projects";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <main className="portfolio-page">
      <ProfileSidebar>
        <p>點擊作品可看到我負責的架構與實作細節。公司專案因保密不附原始碼連結。</p>
      </ProfileSidebar>

      <div className="portfolio-main">
        <FilterTabs filters={PROJECT_FILTERS} active={activeFilter} onChange={setActiveFilter} />
        <div className="portfolio-content">
          {/* key 讓切換篩選時重置詳情對話框的索引 */}
          <ProjectGallery key={activeFilter} projects={filtered} />
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
