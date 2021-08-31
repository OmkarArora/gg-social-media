import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <SkeletonTheme color="#2b2c30" highlightColor="#656871">
        <App />
        </SkeletonTheme>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
