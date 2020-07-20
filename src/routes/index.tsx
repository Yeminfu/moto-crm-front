import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../features/Login/index";

export const Routes = () => (
  <>
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
);

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
