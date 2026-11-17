import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useProjectViews } from "../hooks/useProjectViews";

// 作品卡片列表 + 詳情對話框；箭頭在目前列表內循環切換
const ProjectGallery = ({ projects, className = "" }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const current = openIndex === null ? null : projects[openIndex];
  const { views, recordView } = useProjectViews();
  const currentId = current?.id;

  // 開啟或切換到某件作品的詳情時記錄一次瀏覽
  useEffect(() => {
    if (currentId) recordView(currentId);
  }, [currentId, recordView]);

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
        views={current && views ? (views[current.id] ?? 0) : null}
        onClose={() => setOpenIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
};

export default ProjectGallery;
