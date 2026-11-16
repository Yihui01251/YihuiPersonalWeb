import React, { useState } from "react";
import meImg from "../assets/images/me.png";
import ProjectCard from "../component/ProjectCard";
import { PROJECT_FILTERS, projects } from "../data/projects";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <main className="portfolio-page">
      <aside className="portfolio-sidebar">
        <div className="sidebar-profile">
          <img src={meImg} alt="詹怡慧" className="sidebar-photo" />
          <p className="sidebar-name">詹怡慧</p>
          <p className="sidebar-role">Frontend Engineer</p>
          <p className="sidebar-role sidebar-role--sub">Full-stack Ready</p>
        </div>
        <div className="sidebar-bio">
          <p>公司專案因保密不附原始碼連結，展開「技術重點」可看到我負責的架構與實作細節。</p>
        </div>
        <div className="sidebar-contact">
          <a href="mailto:ciuhyi@gmail.com" className="sidebar-email">ciuhyi@gmail.com</a>
        </div>
      </aside>

      <div className="portfolio-main">
        <div className="portfolio-filters">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${activeFilter === f.key ? "filter-btn--active" : ""}`}
              aria-pressed={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="portfolio-content">
          <div className="project-grid">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
