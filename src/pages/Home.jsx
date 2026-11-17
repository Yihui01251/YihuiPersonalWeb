import { Link } from "react-router-dom";
import meImage from "../assets/images/me.png";
import portfolioBookImage from "../assets/images/index-portfolio-book.png";
import ProjectGallery from "../component/ProjectGallery";
import { featuredProjects, projects } from "../data/projects";
import { skillGroups, aiPractices } from "../data/skills";
import { formatExperience, workStartLabel } from "../data/experience";
import { strengths } from "../data/strengths";

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
            <p>Frontend Engineer</p>
          </div>
          <p className="hero-board-code">{"`}"}</p>
        </div>

        <p className="hero-desc">
          凌群電腦前端工程師。Channel+ 教育廣播電台前台（Nuxt 3 SSR）主要開發者、主導體大運動資料庫重構；
          用契約、分層與測試約束 AI 產出，並把這套做法做成團隊的 Claude Code Plugin 與 CI AI 審查。
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
            <p className="fact-note">{workStartLabel} 起｜凌群電腦</p>
          </div>
          <div className="fact">
            <p className="fact-label">主力技術</p>
            <p className="fact-value fact-value--sm">Vue3 / Nuxt3</p>
            <p className="fact-note">TypeScript · Pinia · Vitest · Gherkin</p>
          </div>
          <div className="fact">
            <p className="fact-label">應徵方向</p>
            <p className="fact-value fact-value--sm">前端負責人</p>
            <p className="fact-note">架構、工具鏈、標案評估</p>
          </div>
          <div className="fact fact--accent">
            <p className="fact-label">AI 工作流</p>
            <p className="fact-value fact-value--sm">團隊 AI 工具鏈</p>
            <p className="fact-note">Claude Code Plugin · CI AI 審查 · Notion 同步</p>
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
              從職訓手刻基本功出發，一路成長為能定義架構、建立團隊 AI 工具鏈並參與標案評估的前端工程師。
            </p>
            <Link to="/aboutMe" className="btn-outline">了解我</Link>
          </div>
          <img className="home-about-photo" src={meImage} alt="詹怡慧的照片" />
        </div>
      </section>

      {/* 核心特質 */}
      <section className="home-strengths">
        <h2 className="quote-title">核心特質</h2>
        <ol className="highlight-list">
          {strengths.map((s, i) => (
            <li key={s.title} className="highlight-item">
              <span className="highlight-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="highlight-content">
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </div>
            </li>
          ))}
        </ol>
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
            <p>Nuxt3 SSR、權限系統、分層架構、AI 工具鏈，共 {projects.length} 件作品</p>
            <Link to="/portfolio" className="btn-outline">觀看作品集</Link>
          </div>
        </div>
      </section>

      {/* AI 應用：Figma 學習紀錄卡樣式（深青卡 + 蜜桃標籤） */}
      <section className="home-ai">
        <h2 className="quote-title">AI 應用在工作上</h2>
        <p className="section-lead">不只是用 AI 寫 code，而是把它變成同事與 PM 都在用的流程</p>
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
