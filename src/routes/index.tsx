import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "../features/Login/index";

export const Routes = () => (
  <>
    <Router>
      <div>
        <nav>
          <ul>
            {[{ link: "/", label: "Home" }].map((x, i) => (
              <li>
                <Link to={x.link}>{x.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
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
