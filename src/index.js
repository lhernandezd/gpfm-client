import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import configureStore from "./configureStore";
import { loginUserSuccess } from "./actions/authentication";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

const accessToken = localStorage.getItem("token");

if (accessToken !== null) {
  store.dispatch(loginUserSuccess(accessToken));
}

const renderApp = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
