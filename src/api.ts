import axios from "axios";
import { logout } from "./features/Login";

const baseUrl = "http://birmotqe.beget.tech/api/?service=";

export interface productType {
  name: string;
  asd: string;
}

const headers = () => {
  return {
    headers: {
      // Authorization: localStorage.getItem("token"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};

export const API = {
  login: (login: string, password: string) =>
    axios.post(baseUrl + "sign_in", { login, password }, headers()),
  get_report: (params: any) =>
    axios.get(baseUrl + "report", { params: params, ...headers() }),
  get_staff: () => axios.get(baseUrl + "get_staff", headers()),
  get_shops: () => axios.get(baseUrl + "get_shops", headers()),
  get_roles: () => axios.get(baseUrl + "get_roles", headers()),
  get_categories: () => axios.get(baseUrl + "get_categories", headers()),
  get_products: (params: { category: string }) =>
    axios.get(baseUrl + "get_products", { params: params, ...headers() }),
  get_product: (params: { product_id: string }) =>
    axios.get(baseUrl + "get_product", { params: params, ...headers() }),
  add_products: (params: productType) =>
    axios.post(baseUrl + "add_products", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  edit_product: (params: productType) =>
    axios.post(baseUrl + "edit_product", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_sale: (params: any) =>
    axios.post(baseUrl + "add_sale", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_category: (params: any) =>
    axios.post(baseUrl + "add_category", params, headers()),
  add_shop: (params: any) =>
    axios.post(baseUrl + "add_shop", params, headers()),
  add_user: (params: any) =>
    axios.post(baseUrl + "add_user", params, headers()),
  add_to_stock: (params: any) =>
    axios.post(baseUrl + "add_to_stock", params, headers()),
};

axios.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // console.log("error", error);
      logout();
      //place your reentry code
    }
    return error;
  }
);
