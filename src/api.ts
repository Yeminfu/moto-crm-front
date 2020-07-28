import axios from "axios";

const baseUrl = "http://localhost:3001/api/";

export const API = {
  login: (login: string, password: string) =>
    axios.post(baseUrl + "login", { login, password }),
  report: (params: any) => axios.get(baseUrl + "report", { params: params }),
  add_products: (params: any) => axios.post(baseUrl + "add-products", params),
  add_sale: (params: any) => axios.post(baseUrl + "add-sale", params),
};
