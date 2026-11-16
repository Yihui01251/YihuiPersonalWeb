import React from "react";
import { Link } from "react-router-dom";
import meImage from "../assets/images/me.png";
import portfolioBookImage from "../assets/images/index-portfolio-book.png";
import ProjectGallery from "../component/ProjectGallery";
import { featuredProjects, projects } from "../data/projects";
import { skillGroups, aiPractices } from "../data/skills";
import { formatExperience, workStartLabel } from "../data/experience";

const Home = () => {
  const experience = formatExperience();

  return (
    <main className="home">
      {/* Hero：Figma 的傾斜程式碼看板，放入姓名與職稱讓 HR 第一眼看到 */}
      <section className="hero">
        <span className="hero-block hero-block--1"></span>
        <span className="hero-block hero-block--2"></span>
        <span className="hero-block hero-block--3"></span>
        <span className="hero-block hero-block--4"></span>

        <div className="hero-board">
          <p className="hero-board-code">{"{`"}</p>
          <div className="hero-board-text">
            <h1>詹怡慧</h1>
            <p>Frontend Engineer · Full-stack Ready</p>
          </div>
          <p className="hero-board-code">{"`}"}</p>
        </div>

        <p className="hero-desc">
          重視 SOLID 與 Clean Code 的前端工程師，負責過多角色權限平台與 Nuxt 3 SSR 影音平台；
          並把 AI 導入團隊流程：將規範做成 AI Skill、自動化 Code Review 與技術文件。
        </p>
        <div className="hero-cta">
          <Link to="/portfolio" className="btn-primary">查看作品集</Link>
          <a href="mailto:ciuhyi@gmail.com" className="btn-outline">聯繫我</a>
        </div>
      </section>

      {/* 快速資訊（bento）：HR 最常找的四件事 */}
      <section className="facts" aria-label="快速資訊">
        <div className="facts-grid">
          <div className="fact fact--wide">
            <p className="fact-label">前端工作經驗</p>
            <p className="fact-value">{experience}</p>
            <p className="fact-note">{workStartLabel} 起至今</p>
          </div>
          <div className="fact">
            <p className="fact-label">主力技術</p>
            <p className="fact-value fact-value--sm">Vue3 / Nuxt3</p>
            <p className="fact-note">TypeScript · Pinia · Vitest</p>
          </div>
          <div className="fact">
            <p className="fact-label">應徵方向</p>
            <p className="fact-value fact-value--sm">資深前端 / 全端</p>
            <p className="fact-note">已實作 Nuxt Server Routes</p>
          </div>
          <div className="fact fact--accent">
            <p className="fact-label">AI 工作流</p>
            <p className="fact-value fact-value--sm">100+ 份協作紀錄</p>
            <p className="fact-note">Claude Code Skill / Plugin</p>
          </div>
        </div>
      </section>

      {/* 關於我 */}
      <section className="home-about">
        <h2 className="quote-title">關於我</h2>
        <div className="home-about-content">
          <div className="home-about-text">
            <h3>您好！我是詹怡慧</h3>
            <p>
              從大學的 C# 遊戲開發走到前端，現在以 Vue3 / Nuxt3 開發產品。
              喜歡在寫 code 前先想清楚架構，也喜歡把重複的工作交給 AI 與自動化。
            </p>
            <Link to="/aboutMe" className="btn-outline">了解我</Link>
          </div>
          <img className="home-about-photo" src={meImage} alt="詹怡慧的照片" />
        </div>
      </section>

      {/* 精選專案 */}
      <section className="home-projects">
        <h2 className="quote-title">精選專案</h2>
        <ProjectGallery projects={featuredProjects} className="home-projects-grid" />

        <div className="portfolio-teaser">
          <img src={portfolioBookImage} alt="" aria-hidden="true" />
          <div className="portfolio-teaser-content">
            <p className="portfolio-teaser-title">
              你能<span>看</span>到...
            </p>
            <p>Nuxt3 SSR、權限系統、全端 Server Routes、AI 工具鏈，共 {projects.length} 件作品</p>
            <Link to="/portfolio" className="btn-outline">觀看作品集</Link>
          </div>
        </div>
      </section>

      {/* AI 應用：Figma 學習紀錄卡樣式（深青卡 + 蜜桃標籤） */}
      <section className="home-ai">
        <h2 className="quote-title">AI 應用在工作上</h2>
        <p className="section-lead">不只是用 AI 寫 code，而是把它變成團隊可以重複使用的流程</p>
        <div className="note-grid">
          {aiPractices.map((a) => (
            <article key={a.title} className="note-card">
              <h3 className="note-title">{a.title}</h3>
              <p className="note-desc">{a.desc}</p>
              <span className="note-pill">{a.tag}</span>
            </article>
          ))}
        </div>
        <Link to="/learningNote" className="btn-outline home-ai-more">看工程學習紀錄</Link>
      </section>

      {/* 技術棧 */}
      <section className="home-skills">
        <h2 className="quote-title">技術棧</h2>
        <div className="skill-panel">
          {skillGroups.map((g) => (
            <div key={g.key} className="skill-row">
              <p className="skill-row-label">{g.label}</p>
              <div className="tags-Container">
                {g.items.map((t) => (
                  <span key={t} className={`tag tag--${g.key}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 聯繫我：海浪 + 沙灘 */}
      <section className="index-contact">
        <div className="contact-top">
          <h2>聯繫我</h2>
        </div>
        <div className="contact-bottom">
          <p>歡迎工作機會洽談或技術交流</p>
          <div className="contact-links">
            <a href="mailto:ciuhyi@gmail.com" className="btn-outline">ciuhyi@gmail.com</a>
            <a href="https://github.com/Yihui01251" target="_blank" rel="noreferrer" className="btn-outline">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
