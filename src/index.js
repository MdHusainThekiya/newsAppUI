import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// if react-app is hosted on "server" then protocol will be redirected to "https"
if((window.location.port == "") && (window.location.host.split(":")[0] != "localhost" || window.location.host.split(":")[1] != window.location.port) && window.location.protocol === "http:"){
  window.location.protocol = "https:";
}else{
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
