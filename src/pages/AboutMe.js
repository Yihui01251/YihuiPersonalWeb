// src/pages/AboutMe.js
import React from 'react';
import meImage from "../assets/images/me.png";
import experienceImage from "../assets/images/experience.svg";
import titleImage from "../assets/images/aboutMe-title.png";
import csharpLogo from "../assets/images/CSharp-Logo.png";
import reactLogo from "../assets/images/React-Logo.png";
import javascriptLogo from "../assets/images/JavaScript-Logo.png";
import css3Logo from "../assets/images/CSS3-Logo.png";
import sassLogo from "../assets/images/sass-Logo.png";
import html5Logo from "../assets/images/Html5-Logo.png";
import jqueryLogo from "../assets/images/JQuery-Logo.png";
import figmaLogo from "../assets/images/Figma-Logo.png";

const AboutMe = () => {
  return (
    <main>
      <div className="aboutMe-Banner"> 
        <div className="aboutMe-info">
          <div className="aboutMe-img">
            <img src={meImage} alt="" />
          </div>
          <div className="aboutMe-keyword">
            <h1>詹怡慧 <span>ciuhyi@gmail.com</span></h1>
            <div className="tags-Container">
              <p className="tag">目標前端工程師</p>
              <p className="tag">組織規劃</p>
              <p className="tag">追求進步</p>
            </div>
          </div>
        </div>

        <div className="aboutMe-intro">
          <p>
            從大學開始接觸程式和設計，四年累積了一些遊戲製作和設計的經驗。由於大二網頁設計課接觸HTML，種下了好奇的種子；在看到職訓班網頁課程時冒出的小芽推動我報名，經過三個月的學習和實作，讓我確定想深根前端。
            希望自己有機會通過工作熟練與後端交接的過程，幫助團隊有效率地完成專案。
          </p>
        </div>
      </div>

      <div className="aboutMe-content">
        <div className="aboutMe-experience">
          <img src={experienceImage} alt="" />
        </div>
        <div className="aboutMe-skills">
          <div className="aboutMe-title">
            <img src={titleImage} alt="title裝飾" />
          </div>
          <div className="skills-container">
            <a href="#"><img src={csharpLogo} alt="CSharp按鈕" /></a>
            <a href="#"><img src={reactLogo} alt="React按鈕" /></a>
            <a href="#"><img src={javascriptLogo} alt="JavaScript按鈕" /></a>
            <a href="#"><img src={css3Logo} alt="CSS3按鈕" /></a>
            <a href="#"><img src={sassLogo} alt="sass按鈕" /></a>
            <a href="#"><img src={html5Logo} alt="Html按鈕" /></a>
            <a href="#"><img src={jqueryLogo} alt="JQuery按鈕" /></a>
            <a href="#"><img src={figmaLogo} alt="Figma按鈕" /></a>
          </div>
        </div>
        <div className="aboutMe-project"></div>
      </div>
    </main>
  );
};

export default AboutMe;
