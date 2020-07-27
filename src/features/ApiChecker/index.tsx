import React from "react";
import "./ApiCHecker.scss";
import { Login } from "./login";
import { Report } from "./report";
import { AddProducts } from "./add-products";

export const ApiChecker = () => (
  <>
    <Login />
    <Report />
    <AddProducts />
  </>
);
