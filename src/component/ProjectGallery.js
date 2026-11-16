import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

// 作品卡片列表 + 詳情對話框；箭頭在目前列表內循環切換
const ProjectGallery = ({ projects, className = "" }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const current = openIndex === null ? null : projects[openIndex];

  const step = (delta) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + projects.length) % projects.length));

  return (
    <>
      <div className={`project-grid ${className}`}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>
      <ProjectModal
        project={current}
        onClose={() => setOpenIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
};

export default ProjectGallery;
