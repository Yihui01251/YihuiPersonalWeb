import React from "react";
import meImage from "../assets/images/me.png";
import titleDecoSquare from "../assets/images/aboutMe-title01.png";
import titleDecoCircle from "../assets/images/aboutMe-title.png";
import { skillGroups, aiPractices } from "../data/skills";
import { formatExperience, workStartLabel } from "../data/experience";
import { strengths } from "../data/strengths";

// 依時間順序（舊 → 新），桌面版橫向時間軸、手機版直向
const timeline = [
  {
    date: "2023.06",
    title: "實踐大學 資訊模擬與設計學系 畢業",
    desc: "累積遊戲程式設計（C#）與視覺設計經驗。",
    tech: ["C#", "Unity", "Figma"],
  },
  {
    date: "2024.03 — 2024.06",
    title: "職訓局 互動式網頁設計課程 結訓",
    desc: "HTML / CSS / JavaScript 到 React、Sass，確立轉職前端。",
    tech: ["JavaScript", "React", "Sass"],
  },
  {
    date: `${workStartLabel} — 現在（${formatExperience()}）`,
    title: "前端工程師",
    desc: "獨立開發前台並同時維護 1–2 個專案；推動 Service 層重構、測試與 CI，建立團隊 AI 協作規範。帶實習生、參與面試，主導前端進度 sync。",
    tech: ["Vue3", "Nuxt3", "TypeScript", "Vitest"],
    current: true,
  },
];

const SectionTitle = ({ deco, children }) => (
  <div className="aboutMe-title">
    <img src={deco} alt="" aria-hidden="true" />
    <h2>{children}</h2>
  </div>
);

const AboutMe = () => {
  return (
    <main className="about-page">
      <div className="aboutMe-Banner">
        <div className="aboutMe-info">
          <img className="aboutMe-img" src={meImage} alt="詹怡慧" />
          <div className="aboutMe-keyword">
            <h1>
              詹怡慧 <span>Frontend Engineer</span>
            </h1>
            <div className="tags-Container">
              <span className="tag">Vue3 / Nuxt3</span>
              <span className="tag">架構設計 · SOLID</span>
              <span className="tag">AI 協作工作流</span>
              <span className="tag">帶人 · 技術交流</span>
              <span className="tag tag--outline">往全端發展</span>
            </div>
            <a href="mailto:ciuhyi@gmail.com" className="aboutMe-email">ciuhyi@gmail.com</a>
          </div>
        </div>

        <div className="aboutMe-intro">
          <p>
            從大學的 C# 遊戲開發，到職訓局的網頁課程，確定了投入前端的方向。
            目前以 <strong>Vue3 / Nuxt3</strong> 開發多個產品，包含多角色權限平台與 SSR 影音平台。
          </p>
          <p>
            我習慣寫 code 前先想架構：統一 API 錯誤處理的 Service 層、隔離後端資料的 DTO / Domain、
            可測試的 composables，<strong>SOLID</strong> 與 <strong>Clean Code</strong> 是我評估設計的基準。
          </p>
          <p>
            到職 1 週就接手開發中的專案並提前完成；能預估工時，至今<strong>沒有延誤過時程</strong>。
            除了開發，我也帶實習生與新進同事、參與前端面試，並主導團隊的進度 sync 與技術交流。
          </p>
          <p>
            我把 <strong>AI 導入團隊流程</strong>：交接文件模板、Git commit 彙整進度報告等做法，
            已經是同事與 PM 實際在用的工具。接下來以 Nuxt Server Routes 與 Node.js 為起點，
            持續往<strong>全端工程師</strong>發展。
          </p>
        </div>
      </div>

      <div className="aboutMe-content">
        <section className="aboutMe-section">
          <SectionTitle deco={titleDecoSquare}>學經歷</SectionTitle>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.title} className={`timeline-item ${t.current ? "timeline-item--current" : ""}`}>
                <p className="timeline-label">{t.title}</p>
                <span className="timeline-dot" aria-hidden="true"></span>
                <p className="timeline-date">{t.date}</p>
                <p className="timeline-desc">{t.desc}</p>
                <p className="timeline-tech">{t.tech.join("、")}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="aboutMe-section">
          <SectionTitle deco={titleDecoCircle}>工作亮點</SectionTitle>
          <div className="strength-grid">
            {strengths.map((s, i) => (
              <article key={s.title} className="strength-card">
                <h3>
                  <span className="strength-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h3>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="aboutMe-section">
          <SectionTitle deco={titleDecoSquare}>技能</SectionTitle>
          <div className="skill-panel">
            {skillGroups.map((g) => (
              <div key={g.key} className="skill-row">
                <p className="skill-row-label">{g.label}</p>
                <div className="tags-Container">
                  {g.items.map((s) => (
                    <span key={s} className={`tag tag--${g.key}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="aboutMe-section">
          <SectionTitle deco={titleDecoCircle}>我如何運用 AI</SectionTitle>
          <div className="note-grid">
            {aiPractices.map((a) => (
              <article key={a.title} className="note-card">
                <h3 className="note-title">{a.title}</h3>
                <p className="note-desc">{a.desc}</p>
                <span className="note-pill">{a.tag}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutMe;
