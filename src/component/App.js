import { useEffect,useState } from "react";
import axios from "axios";
import $ from "jquery";
//外部檔案
import logo from '../images/logo.svg';
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
        <img src={logo} className="App-logo" alt="logo" />
        <div id="jQtext"></div>
        <button type="button" class="btn btn-primary" onClick={()=>{$(function(){$('#jQtext').text('jQuery').css({color:'red'});  })}}>Primary</button>
        <p>
          i i i 
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Input id="12test" value={account} onChangHandler={(e)=>{setAccount(e.target.value)}}/>
      </header>
    </div>
  );
}

export default App;
