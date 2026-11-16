import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/LOGO.png";

export const NAV_ITEMS = [
  { path: "/", label: "首頁" },
  { path: "/aboutMe", label: "關於我" },
  { path: "/portfolio", label: "作品集" },
  { path: "/learningNote", label: "學習紀錄" },
];

// Figma：作品集與學習紀錄頁使用深色頁首
const DARK_PAGES = ["/portfolio", "/learningNote"];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={DARK_PAGES.includes(pathname) ? "header--dark" : ""}>
      <Link to="/" aria-label="回首頁">
        <img className="logo" src={logo} alt="怡慧個人網站的LOGO" />
      </Link>
      <nav id="topBar">
        <ul id="menu">
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={pathname === path ? "nav-link nav-link--active" : "nav-link"}
                aria-current={pathname === path ? "page" : undefined}
              >
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
