import React from "react";
import meImg from "../assets/images/me.png";
import { formatExperience } from "../data/experience";

// Figma「自介欄」：作品集與學習紀錄共用
const ProfileSidebar = ({ children }) => (
  <aside className="portfolio-sidebar">
    <div className="sidebar-profile">
      <img src={meImg} alt="詹怡慧" className="sidebar-photo" />
      <p className="sidebar-name">詹怡慧</p>
      <p className="sidebar-role">Frontend Engineer</p>
      <p className="sidebar-role sidebar-role--sub">前端經驗 {formatExperience()}</p>
    </div>
    <div className="sidebar-bio">{children}</div>
    <a href="mailto:ciuhyi@gmail.com" className="sidebar-email">ciuhyi@gmail.com</a>
  </aside>
);

export default ProfileSidebar;
