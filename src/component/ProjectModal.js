import React, { useEffect, useRef } from "react";
import { categoryLabel } from "./ProjectCard";

// Figma「作品集/詳情」：{ 作品名稱 }、作品圖、{ 作品介紹 }，左右箭頭切換作品
// 使用原生 <dialog>：內建 Esc 關閉、焦點鎖定與背景不可互動
const ProjectModal = ({ project, onClose, onPrev, onNext }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  // 點擊對話框外的遮罩時關閉
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      aria-labelledby="project-modal-title"
    >
      {project && (
        <div className="project-modal-inner">
          <button type="button" className="project-modal-close" onClick={onClose} aria-label="關閉">
            ×
          </button>

          <h2 id="project-modal-title" className="project-modal-title">
            {"{ "}
            {project.title}
            {" }"}
          </h2>
          <p className="project-modal-meta">
            {project.type} · {project.category.map(categoryLabel).join(" / ")}
          </p>

          <div className="project-modal-media">
            <button type="button" className="project-modal-arrow" onClick={onPrev} aria-label="上一個作品">
              ‹
            </button>
            <div className="project-modal-screen">
              {project.image ? (
                <img src={project.image} alt={`${project.title} 畫面`} />
              ) : (
                <p className="project-modal-summary">{project.summary}</p>
              )}
            </div>
            <button type="button" className="project-modal-arrow" onClick={onNext} aria-label="下一個作品">
              ›
            </button>
          </div>

          <h3 className="project-modal-subtitle">{"{ 作品介紹 }"}</h3>
          {project.image && <p className="project-modal-text">{project.summary}</p>}

          <ul className="project-modal-list">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {project.ai && (
            <p className="project-modal-ai">
              <strong>AI 應用：</strong>
              {project.ai}
            </p>
          )}

          <div className="tags-Container">
            {project.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          {(project.links.demo || project.links.github) && (
            <div className="project-modal-links">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn-primary">Demo</a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-outline">GitHub</a>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
};

export default ProjectModal;
