import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { App } from "./components/App/App";
import { Provider } from "mobx-react";
import { createStore } from "./store/createStore";

const stores = {
  store: createStore("abc")
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
