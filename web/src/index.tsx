import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AccountProvider from "./contexts/AccountContext";

import RegisteredRoute from "./components/RegisteredRoute";
import UnregisteredRoute from "./components/UnregisteredRoute";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Error404 from "./screens/Error404";

import * as serviceWorker from "./serviceWorker";

import "./styles/tailwind.out.css";
import { Apollo } from "./contexts/Apollo";

ReactDOM.render(
  <React.StrictMode>
    <AccountProvider>
      <Apollo>
        <Router>
          <Switch>
            <UnregisteredRoute path="/register" exact component={Register} />
            <RegisteredRoute path="/" exact component={Home} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </Apollo>
    </AccountProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
