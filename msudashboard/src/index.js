import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./styles/index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./redux/store";
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
