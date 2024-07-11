import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "./index.css";
import customTheme from "./assets/theme/customTheme.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <ConfigProvider theme={customTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
  </Provider>
);
