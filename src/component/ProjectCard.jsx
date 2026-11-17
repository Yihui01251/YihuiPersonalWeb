import { PROJECT_FILTERS } from "../data/projects";

export const categoryLabel = (key) => PROJECT_FILTERS.find((f) => f.key === key)?.label;

// Figma「btn/作品」：資料夾造型卡片，點擊開啟作品詳情
const ProjectCard = ({ project, onOpen }) => {
  const { title, type, category, tech, summary, image, period } = project;

  return (
    <button type="button" className="project-card" onClick={() => onOpen(project)}>
      <span className="project-folder">
        {image ? (
          <img src={image} alt="" />
        ) : (
          <span className="project-folder-label">{tech.slice(0, 2).join(" · ")}</span>
        )}
      </span>

      <span className="project-card-body">
        <span className="project-card-categories">
          <span className="project-type">{type}</span>
          {category.map((c) => (
            <span key={c} className={`project-cat project-cat--${c}`}>
              {categoryLabel(c)}
            </span>
          ))}
        </span>
        <span className="project-card-title">{title}</span>
        {period && <span className="project-card-period">{period}</span>}
        <span className="project-card-desc">{summary}</span>
        <span className="project-card-more">查看技術重點 →</span>
      </span>
    </button>
  );
};

export default ProjectCard;
