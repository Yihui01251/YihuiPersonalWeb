import React from 'react';
export function TopBar ()  {
  return (
    <>
      <header>
        <img className="logo" src="/images/LOGO.png" alt="怡慧個人網站的LOGO" />
        <nav id="topBar">
          <ul id="menu">
            <li>
              <a href="./index.html">首頁</a>
            </li>
            <li>
              <a href="./aboutMe.html">關於我</a>
            </li>
            <li>
              <a href="./portfolio.html">作品集</a>
            </li>
            <li>
              <a href="./learningNote.html">學習紀錄</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export function Footer() {
  return (
    <>
      <footer>
        <img className="logo" src="./images/LOGO.svg" alt="LOGO" />
        <div>
          <a href="./index.html">首頁</a>
          <a href="./aboutMe.html">關於我</a>
          <a href="./portfolio.html">作品集</a>
          <a href="./learningNote.html">學習紀錄</a>
        </div>
        <small className="copyright">Copyright© 2024 詹怡慧</small>
      </footer>
    </>
  );
};
