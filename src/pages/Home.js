/* src/pages/Home.js */
import React from "react";
//路由器
import { Link } from "react-router-dom";
//輪播套件
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
/* 圖片 */
import banner from "../assets/images/banner.svg";
import decorateBanner from "../assets/images/decorate-banner.png";
import decorateBanner04 from "../assets/images/decorate-banner04.png";

import meImage from "../assets/images/me.png";
import facebookImage from "../assets/images/Facebook.png";
import portfolioBookImage from "../assets/images/index-portfolio-book.png";

const Home = () => {
  return (
    <main>
      <section className="index-banner">
        <div>
          <img className="decorate-banner" src={decorateBanner} alt="" />
        </div>
        <div>
          <img className="decorate-banner3" src={decorateBanner04} alt="" />
        </div>
        <img className="banner" src={banner} alt="" />
      </section>
      <section className="index-aboutMe">
        <h2>"關於我"</h2>
        <div className="aboutMe-content">
          <div className="content-intro">
            <h3>您好!我是詹怡慧</h3>
            <p>
              從大學開始做遊戲程式設計，到畢業後嘗試做前端。
              是個在前進的過程尋找適合自己的路， 並在當下追求進步的人。
            </p>
            <Link to="/aboutMe" className="button">
              了解我
            </Link>
          </div>
          <img src={meImage} alt="怡慧的生活照" />
        </div>
      </section>
      <section className="index-portfolio">
        <h2>"作品集"</h2>
        <div className="index-portfolioInfo">
          <img src={portfolioBookImage} alt="書" />
          <div className="index-portfolioInfo-content">
            <div className="index-portfolioInfo-content-infoTitle">
              <p>你能</p>
              <p style={{ fontSize: "1.75rem" }}>看</p>
              <p>到...</p>
            </div>
            <p style={{ alignSelf: "center" }}>
              scss切版、react、javaScript、C#遊戲、設計
            </p>
            <Link to="/portfolio" className="button">
              觀看作品集
            </Link>
          </div>
        </div>
      </section>
      <section className="index-note">
        <h2>"學習紀錄"</h2>

        <div className="index-noteContainer">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <a
                href="#"
                className="simple-learnNoteComponent"
                id="swiper1"
              >
                <h3>文章標題</h3>
                <div className="hugTag">
                  <p className="tag-card">程式</p>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                href="#"
                className="simple-learnNoteComponent"
                id="swiper2"
              >
                <h3>嘗試Figma多重選單</h3>
                <div className="hugTag">
                  <p className="tag-card">設計</p>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                href="#"
                className="simple-learnNoteComponent"
                id="swiper3"
              >
                <h3>js更新子選項</h3>
                <div className="hugTag">
                  <p className="tag-card">程式</p>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a
                href="#"
                className="simple-learnNoteComponent"
                id="swiper4"
              >
                <h3>react多重篩選</h3>
                <div className="hugTag">
                  <p className="tag-card">程式</p>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="#" className="simple-learnNoteComponent">
                <h3>文章標題</h3>
                <div className="hugTag">
                  <p className="tag-card">tag</p>
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
        <Link to="/learningNote" className="button">
          更多
        </Link>
      </section>
      <section className="index-contact">
        <div className="contact-top">
          <h2>{"聯繫我"}</h2>
        </div>
        <div className="contact-bottom">
          <a href="https://www.facebook.com/zhan.y.hui.92?mibextid=LQQJ4d">
            <img src={facebookImage} alt="" />
          </a>
          <p>信箱 : ciuhyi@gmail.com</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
