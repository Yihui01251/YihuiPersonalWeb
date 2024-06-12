// src/pages/Portfolio.js
import React from "react";
//導入圖片
import meImg from '../assets/images/me.png';
import protfolio01Img from '../assets/images/protfolio01.png';
import protfolio02Img from '../assets/images/protfolio02.png';

const Portfolio = () => {
  return (
    <main className="blogArea">
      <div className="section-intro">
        <img src={meImg} alt="" />
        <p>詹怡慧</p>
        <p>
          歡迎來到我的個人網站！我是一位資訊模擬與設計學系的大學畢業生，擁有兩年C#遊戲開發經驗
          ； 並主動上職訓局的互動式網頁設計課程實作三個月加深網頁設計的技能。
          我的網站展示設計和程式的作品和學習經歷，正在朝成為前端工程師的方向前進。
        </p>
      </div>
      <div className="section-content">
        <div className="btnContainer">
          <button>全部</button>
          <button>程式</button>
          <button>設計</button>
          <button>其他</button>
        </div>
        <div className="contentContainer">
          <a href="#" className="portfolio-file">
            <h3>Figma</h3>
            <img src={protfolio01Img} alt="" />
          </a>
          <a href="#" className="portfolio-file">
            <h3>現在想打球</h3>
            <img src={protfolio02Img} alt="" />
          </a>
          <a href="#" className="portfolio-file">
            <h3>Figma</h3>
            <img src={protfolio01Img} alt="" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
