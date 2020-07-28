import React from "react";
import "./ApiCHecker.scss";
import { Login } from "./login";
import { Report } from "./report";
import { AddProducts } from "./add-products";
import { AddSale } from "./add-sale";

export const ApiChecker = () => (
  <>
    <Login />
    <Report />
    <AddProducts />
    <AddSale />
  </>
);
