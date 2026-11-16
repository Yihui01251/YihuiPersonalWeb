import "./styleSheet/style.scss";
// GitHub Pages 是靜態主機，HashRouter 讓重新整理與分享子頁連結不會 404
import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
