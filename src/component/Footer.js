import React from 'react';
import { Link } from 'react-router-dom';
//圖片
import logo from "../assets/images/LOGO.svg";
const Footer = () => {
    return (
      <>
        <footer>
          <img className="logo" src={logo} alt="LOGO" />
          <div>
            <Link to="/YihuiPersonalWeb">首頁</Link>
            <Link to="/aboutMe">關於我</Link>
            <Link to="/portfolio">作品集</Link>
            <Link to="/learningNote">學習紀錄</Link>
          </div>
          <small className="copyright">Copyright© 2024 詹怡慧</small>
        </footer>
      </>
    );
  };

  export default Footer;