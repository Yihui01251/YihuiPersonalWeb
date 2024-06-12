/* src/index.js */
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
/* 根元件 */
import App from './App'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>嚴謹模式下開發
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
