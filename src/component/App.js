import { useEffect,useState } from "react";
import axios from "axios";
import $ from "jquery";
//外部檔案
import '../css/App.css';
import Input from './Input';
import '../styleSheet/css/style.css'
//內部檔案


function App() {
  const [account,setAccount]=useState('');


  useEffect(()=>{
    //async非同步處理搭配await使用axios套件
    (async()=>{
      const result = await axios.get('https://randomuser.me/api/');
    })();//加小括號會直接執行
  },[])
  return (
    <div className="App">
      <header className="App-header">
       
     
      </header>
    </div>
  );
}

export default App;
