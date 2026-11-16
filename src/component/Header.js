import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/LOGO.png";

const NAV_ITEMS = [
  { path: "/YihuiPersonalWeb", label: "首頁" },
  { path: "/aboutMe", label: "關於我" },
  { path: "/portfolio", label: "作品集" },
  { path: "/learningNote", label: "學習紀錄" },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <img className="logo" src={logo} alt="怡慧個人網站的LOGO" />
      <nav id="topBar">
        <ul id="menu">
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={pathname === path ? "nav-link nav-link--active" : "nav-link"}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
