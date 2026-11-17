import { useState } from "react";
import ProfileSidebar from "../component/ProfileSidebar";
import FilterTabs from "../component/FilterTabs";
import { NOTE_FILTERS, NOTE_TYPES, notes } from "../data/notes";

const LearningNote = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all" ? notes : notes.filter((n) => n.category === activeFilter);

  return (
    <main className="portfolio-page">
      <ProfileSidebar>
        <p>每個工程任務我都會和 AI 協作並留下紀錄：根因、決策與取捨。這裡節錄其中幾篇。</p>
      </ProfileSidebar>

      <div className="portfolio-main">
        <FilterTabs filters={NOTE_FILTERS} active={activeFilter} onChange={setActiveFilter} />
        <div className="portfolio-content">
          <div className="note-grid">
            {filtered.map((note) => (
              <article key={note.id} className="note-card">
                <p className="note-meta">
                  {note.date} · {note.stack.join(" / ")}
                </p>
                <h3 className="note-title">{note.title}</h3>
                <p className="note-desc">{note.desc}</p>
                <span className="note-pill">{NOTE_TYPES[note.type]}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LearningNote;
