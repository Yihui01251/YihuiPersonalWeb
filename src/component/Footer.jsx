import { Link } from "react-router-dom";
import logo from "../assets/images/LOGO.svg";
import { NAV_ITEMS } from "./Header";

const Footer = () => (
  <footer>
    <img className="logo" src={logo} alt="LOGO" />
    <div>
      {NAV_ITEMS.map(({ path, label }) => (
        <Link key={path} to={path}>{label}</Link>
      ))}
    </div>
    <small className="copyright">Copyright© {new Date().getFullYear()} 詹怡慧</small>
  </footer>
);

export default Footer;
