import React from "react";
import { PROJECT_FILTERS } from "../data/projects";

const categoryLabel = (key) => PROJECT_FILTERS.find((f) => f.key === key)?.label;

const ProjectCard = ({ project, compact = false }) => {
  const { title, type, category, tech, summary, highlights, ai, image, links } = project;

  return (
    <article className="project-card">
      <div className="project-card-img">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="project-card-placeholder">
            <span>{tech.slice(0, 2).join(" · ")}</span>
          </div>
        )}
      </div>

      <div className="project-card-body">
        <div className="project-card-categories">
          <span className="project-type">{type}</span>
          {category.map((c) => (
            <span key={c} className={`project-cat project-cat--${c}`}>
              {categoryLabel(c)}
            </span>
          ))}
        </div>

        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{summary}</p>

        {!compact && highlights?.length > 0 && (
          <details className="project-card-details">
            <summary>技術重點</summary>
            <ul>
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {ai && (
              <p className="project-card-ai">
                <strong>AI 應用：</strong>
                {ai}
              </p>
            )}
          </details>
        )}

        <div className="project-card-tech">
          {tech.map((t) => (
            <span key={t} className="project-tech-tag">
              {t}
            </span>
          ))}
        </div>

        {(links.demo || links.github) && (
          <div className="project-card-links">
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noreferrer" className="project-link">
                Demo
              </a>
            )}
            {links.github && (
              <a href={links.github} target="_blank" rel="noreferrer" className="project-link project-link--ghost">
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
