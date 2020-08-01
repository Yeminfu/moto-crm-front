import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../features/Login";
import { YearReport } from "../features/year-report";
import { ApiChecker } from "../features/ApiChecker";
import { CreateProduct } from "../features/CreateProduct";

export const Routes = () => (
  <>
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/report">
            <YearReport />
          </Route>
          <Route path="/api-checker">
            <ApiChecker />
          </Route>
          <Route path="/create-product">
            <CreateProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
);
