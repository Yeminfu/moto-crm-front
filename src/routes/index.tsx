import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../features/Login";
import { YearReport } from "../features/year-report";
import { CreateProduct } from "../features/CreateProduct";
import { Products } from "../features/products";
import { ArchiveProducts } from "../features/ArchiveProducts";
import { CreateCategory } from "../features/CreateCategory";
import { Staff } from "../features/Staff";
import { ProtectedRoute } from "./ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
import { Dashboard } from "../features/Dashboard";
import { CreateShop } from "../features/CreateShop";
// import { ExcelImport } from "../features/excel/import";

import { SumInProducts } from "../features/SumInProducts";

export const Routes = () => (
  <>
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
      <div>
        <Switch>
          <Route
            exact
            path="/signin"
            render={(props: any) => (
              <>
                <ProtectedAuthRoute
                  redirectTo={props?.location?.state?.pathToGo}
                  onRender={<Login />}
                />
              </>
            )}
          />

          {[
            { path: "/", component: <Dashboard /> },
            { path: "/report", component: <YearReport /> },
            { path: "/create-product", component: <CreateProduct /> },
            { path: "/create-category", component: <CreateCategory /> },
            { path: "/create-shop", component: <CreateShop /> },
            { path: "/products/:id", component: <Products /> },
            { path: "/staff", component: <Staff /> },
            // { path: "/excel", component: <ExcelImport /> },
            { path: "/in-products", component: <SumInProducts /> },
            { path: "/archive-products", component: <ArchiveProducts /> },
          ].map((route: any) => (
            <Route
              key={route.path}
              exact
              path={route.path}
              render={() => (
                <ProtectedRoute
                  onRender={route.component}
                  pathToGo={route.path}
                />
              )}
            />
          ))}
        </Switch>
      </div>
    </Router>
  </>
);
