import axios from "axios";

const baseUrl = "http://birmotqe.beget.tech/api/?service=";

export const API = {
  login: (login: string, password: string) =>
    axios.post(baseUrl + "login", { login, password }),
  get_report: (params: any) =>
    axios.get(baseUrl + "report", { params: params }),
  get_shops: () => axios.get(baseUrl + "get_shops"),
  get_categories: () => axios.get(baseUrl + "get_categories"),
  get_products: (params: { category: string }) =>
    axios.get(baseUrl + "get_products", { params: params }),
  add_products: (params: any) =>
    axios.post(baseUrl + "add_products", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_sale: (params: any) =>
    axios.post(baseUrl + "add_sale", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_category: (params: any) =>
    axios.post(baseUrl + "add_category", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_shop: (params: any) =>
    axios.post(baseUrl + "add_shop", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_user: (params: any) =>
    axios.post(baseUrl + "add_user", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_to_stock: (params: any) =>
    axios.post(baseUrl + "add_to_stock", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
};
