import React from "react";
import meImage from "../assets/images/me.png";
import titleDecoSquare from "../assets/images/aboutMe-title01.png";
import titleDecoCircle from "../assets/images/aboutMe-title.png";
import { skillGroups, aiPractices } from "../data/skills";
import { formatExperience, workStartLabel } from "../data/experience";
import { strengths } from "../data/strengths";
import {
  company,
  jobTitle,
  certifications,
  growthStages,
  sharingTimeline,
  talkOutline,
  aiTimeline,
} from "../data/career";

// 依時間順序（舊 → 新），桌面版橫向時間軸、手機版直向
const timeline = [
  {
    date: "2023.06",
    title: "實踐大學 資訊模擬與設計學系 畢業",
    desc: "累積遊戲程式設計（C#）與視覺設計經驗。",
    tech: ["C#", "Unity", "Figma"],
  },
  {
    date: "2024.04 — 2024.06",
    title: "職訓 互動式網頁設計課程",
    desc: "HTML / CSS / SCSS、JavaScript / jQuery 到 React；小組專題「現在想打球」主要貢獻者。",
    tech: ["SCSS", "JavaScript", "React"],
  },
  {
    date: `${workStartLabel} — 現在（${formatExperience()}）`,
    title: `${company}　${jobTitle}`,
    desc: "Channel+ 前台主要開發者、主導體大運動資料庫重構、金融教育平台唯一前端、課程媒合系統前台獨立開發；建立團隊前端規範與 AI 工具鏈，並負責標案人天評估。",
    tech: ["Vue3", "Nuxt3", "TypeScript", "Vitest"],
    current: true,
  },
];

const otherExperience = [
  "產品規格文件（2026）：AI 智慧客服 MVP 的 UF 系列 Story 總覽與相依矩陣，過程中找出來源產品定義文件漏列的 Story",
  "Unity 虛擬助理（短期支援 1–2 週）：UI 實作、把分散的 UI 綁定集中成單一管理模組、串接天氣 API、調整場景燈光",
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
            <p className="aboutMe-company">
              {company}｜{jobTitle}
            </p>
            <div className="tags-Container">
              <span className="tag">Vue3 / Nuxt3</span>
              <span className="tag">架構與重構</span>
              <span className="tag">團隊 AI 工具鏈</span>
              <span className="tag">技術分享</span>
            </div>
            <a href="mailto:ciuhyi@gmail.com" className="aboutMe-email">ciuhyi@gmail.com</a>
          </div>
        </div>

        <div className="aboutMe-intro">
          <p>
            職訓時從手刻樣式與動畫打基本功，入職當週自學 Vue 就接手既有專案。
            之後從第一筆提交開始負責 <strong>Channel+ 教育廣播電台前台（Nuxt 3 SSR）</strong>，
            並主導<strong>體大運動資料庫</strong>的重構。
          </p>
          <p>
            我從接手既有系統的前端工程師，成長為能<strong>定義架構</strong>、
            <strong>建立團隊 AI 開發工具鏈</strong>、並參與<strong>標案評估</strong>的前端負責人。
            一路的主線是：<strong>實作 → 提煉 → 分享 → 制度化</strong>。
          </p>
          <p>
            我不是單純使用 AI，而是用介面契約、分層架構、測試與 CI 門禁約束 AI 的產出，
            再把這套做法變成團隊可以安裝的工具。目前專注在前端架構與工具鏈，並以 Nuxt Server Routes 與 Node.js 逐步補上後端能力。
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
          <SectionTitle deco={titleDecoCircle}>成長脈絡</SectionTitle>
          <p className="aboutMe-lead">貫穿主線：實作 → 提煉 → 分享 → 制度化</p>
          <ol className="stage-grid">
            {growthStages.map((s) => (
              <li key={s.stage} className="stage-card">
                <p className="stage-meta">
                  {s.stage}｜{s.period}
                </p>
                <h3>{s.title}</h3>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="aboutMe-section">
          <SectionTitle deco={titleDecoSquare}>工作亮點</SectionTitle>
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
          <SectionTitle deco={titleDecoCircle}>技術分享與影響力</SectionTitle>
          <div className="share-layout">
            <ol className="share-timeline">
              {sharingTimeline.map((s) => (
                <li key={s.date + s.text}>
                  <span className="share-date">{s.date}</span>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="strength-card share-talk">
              <h3>「AI 協作時代的前端戰略」分享重點</h3>
              <ul>
                {talkOutline.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="share-note">
                我的角色是啟發與促成：讓同事建立概念、願意主動去做，而不是手把手教學。
                程式碼異味框架引用自 JSDC 2025 講座。
              </p>
            </div>
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
          <ol className="ai-timeline">
            {aiTimeline.map((a) => (
              <li key={a.period}>
                <span className="share-date">{a.period}</span>
                <p>
                  <strong>{a.tools}</strong>
                  <span>{a.note}</span>
                </p>
              </li>
            ))}
          </ol>
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

        <section className="aboutMe-section">
          <SectionTitle deco={titleDecoSquare}>證照與其他經歷</SectionTitle>
          <div className="strength-grid">
            <article className="strength-card">
              <h3>證照</h3>
              <ul>
                {certifications.map((c) => (
                  <li key={c.name}>
                    {c.name}
                    <span className="cert-issuer">　{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="strength-card">
              <h3>其他經歷</h3>
              <ul>
                {otherExperience.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutMe;
