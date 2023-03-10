import React from "react";
import ReactDOM from "react-dom";
import App from "./provider/App";
import AppStyledComponent from "./provider/AppStyledComponent";
import Counter from "./provider/Counter";
import Challenge from "./provider/Challenge";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Challenge />
  </React.StrictMode>,
  rootElement
);
