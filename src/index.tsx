import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

export const store = (
  state = "initialState",
  action: { type: any; filter: any }
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
      });
    default:
      return state;
  }
};

ReactDOM.render(
  <Provider store={createStore(store)}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
