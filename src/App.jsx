import "./styleSheet/style.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

// basename 跟著 Vite 的 base 走：Cloudflare Pages 是根路徑，GitHub Pages 是 /YihuiPersonalWeb/
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

function App() {
  return (
    <div className="App">
      <Router basename={basename}>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
