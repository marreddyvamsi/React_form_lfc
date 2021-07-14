import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { createStore } from "redux";
// const store = createStore(reducer);
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import Results from "./Results";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";
// {/* <Router>
//   <Route exact path="/">
//     <App />
//     </Route>
//   <Route exact path="/results">
//     <Results />
//     </Route>
// </Router> */}
