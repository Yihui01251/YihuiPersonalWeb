// src\component\Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/LOGO.png";

const Header = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="怡慧個人網站的LOGO" />
      <nav id="topBar">
        <ul id="menu">
          <li>
            <Link to="/YihuiPersonalWeb">首頁</Link>
          </li>
          <li>
            <Link to="/aboutMe">關於我</Link>
          </li>
          <li>
            <Link to="/portfolio">作品集</Link>
          </li>
          <li>
            <Link to="/learningNote">學習紀錄</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
