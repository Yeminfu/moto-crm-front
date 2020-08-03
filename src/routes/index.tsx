import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../features/Login";
import { YearReport } from "../features/year-report";
import { ApiChecker } from "../features/ApiChecker";
import { CreateProduct } from "../features/CreateProduct";
import { Products } from "../features/products";
import { CreateCategory } from "../features/CreateCategory";
import { Staff } from "../features/Staff";

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
          <Route path="/create-category">
            <CreateCategory />
          </Route>
          <Route path="/products/:id">
            <Products />
          </Route>
          <Route path="/staff">
            <Staff />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
);
