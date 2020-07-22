import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../features/Login";
import { Dashboard } from "../features/dachboard";
import { ApiChecker } from "../features/ApiChecker";

export const Routes = () => (
  <>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/api-checker">
            <ApiChecker />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
);
