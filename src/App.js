//外部檔案
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
//內部檔案
import "./styleSheet/style.scss";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';


function App() {

  return (
    <div className="App">
      <Router>
         <AppRoutes/>
      </Router>
    </div>
      
  );
}

export default App;
