import React, { useState } from "react";
import meImg from "../assets/images/me.png";
import { NOTE_FILTERS, NOTE_TYPES, notes } from "../data/notes";

const LearningNote = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all" ? notes : notes.filter((n) => n.category === activeFilter);

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
          <p>每個工程任務我都會和 AI 協作並留下紀錄：根因、決策與取捨。這裡節錄其中幾篇。</p>
        </div>
        <div className="sidebar-contact">
          <a href="mailto:ciuhyi@gmail.com" className="sidebar-email">ciuhyi@gmail.com</a>
        </div>
      </aside>

      <div className="portfolio-main">
        <div className="portfolio-filters">
          {NOTE_FILTERS.map((f) => (
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
