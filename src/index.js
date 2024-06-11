import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App';
import reportWebVitals from './reportWebVitals';
import { TopBar, Footer } from './component/component';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>嚴謹模式下開發
  <React.StrictMode>
    <TopBar />
    <main>
      <section className="index-banner">
        <div>
          <img
            className="decorate-banner"
            src="/images/decorate-banner.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="decorate-banner3"
            src="/images/decorate-banner04.png"
            alt=""
          />
        </div>
        <img className="banner" src="images/banner.svg" alt="" />
      </section>
      <section className="index-aboutMe">
        <h2>{"關於我"}</h2>
        <div className="aboutMe-content">
          <div className="content-intro">
            <h3>您好!我是詹怡慧</h3>
            <p>
              從大學開始做遊戲程式設計，到畢業後嘗試做前端。
              是個在前進的過程尋找適合自己的路， 並在當下追求進步的人。
            </p>
            <a href="./aboutMe.html" className="button">了解我</a>
          </div>
          <img src="./images/me.png" alt="怡慧的生活照" />
        </div>
      </section>
      <section className="index-portfolio">
        <h2>{"作品集"}</h2>
        <div className="index-portfolioInfo">
          <img src="./images/index-portfolio-book.png" alt="書" />
          <div className="index-portfolioInfo-content">
            <div className="index-portfolioInfo-content-infoTitle">
              <p>你能</p>
              <p style={{fontSize: "1.75rem"}}>看</p>
              <p>到...</p>
            </div>
            <p style={{alignSelf: "center"}}>
              scss切版、react、javaScript、C#遊戲、設計
            </p>
            <a href="./portfolio.html" className="button">觀看作品集</a>
          </div>
        </div>
      </section>

      <section className="index-note">
        <h2>{"學習紀錄"}</h2>
        <div className="index-noteContainer">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              <a
                href="#"
                className="swiper-slide simple-learnNoteComponent"
                id="swiper1"
              >
                <h3>文章標題</h3>
                <div className="hugTag">
                  <p className="tag-card">程式</p>
                </div>
              </a>
              <a
                href="#"
                className="swiper-slide simple-learnNoteComponent"
                id="swiper2"
              >
                <h3>嘗試Figma多重選單</h3>
                <div className="hugTag">
                  <p className="tag-card">設計</p>
                </div>
              </a>
              <a
                href="#"
                className="swiper-slide simple-learnNoteComponent"
                id="swiper3"
              >
                <h3>js更新子選項</h3>
                <div className="hugTag">
                  <p className="tag-card">程式</p>
                </div>
              </a>
              <a
                href="#"
                className="swiper-slide simple-learnNoteComponent"
                id="swiper4"
              >
                <h3>react多重篩選</h3>
                <div className="hugTag">
                  <p className="tag-card">程式</p>
                </div>
              </a>
              <a href="#" className="swiper-slide simple-learnNoteComponent">
                <h3>文章標題</h3>
                <div className="hugTag">
                  <p className="tag-card">tag</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <a href="./learningNote.html" className="button">更多</a>
      </section>
  
      <section className="index-contact">
        <div className="contact-top"><h2>{"聯繫我"}</h2></div>
        <div className="contact-bottom">
          <a href="https://www.facebook.com/zhan.y.hui.92?mibextid=LQQJ4d"
            ><img src="/images/Facebook.png" alt=""
          /></a>
          <p>信箱 : ciuhyi@gmail.com</p>
        </div>
      </section>
    </main>
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
