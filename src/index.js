import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./app/store";
import { CssBaseline } from "@material-ui/core";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
