import React from "react";
import "./ApiCHecker.scss";
import { Login } from "./login";
import { Report } from "./report";
import { AddProducts } from "./add-products";
import { AddSale } from "./add-sale";
import { AddCategory } from "./add-category";
import { Addshop } from "./add-shop";
import { AddUser } from "./add-user";

export const ApiChecker = () => (
  <>
    <Login />
    <Report />
    <AddProducts />
    <AddSale />
    <AddCategory />
    <Addshop />
    <AddUser />
  </>
);
