import axios from "axios";
import { logout } from "./features/Login";

// const baseUrl = "/api/?service=";
const baseUrl = "http://127.0.0.1/?service=";

export type productType = any;
// export interface productType {
//   name: string;
//   // asd: string;
// }
export interface categoryType {
  name: string;
  id: string;
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
  get_sum_in_products: (params?: any) =>
    axios.get(baseUrl + "get_sum_in_products", {
      params: params,
      ...headers(),
    }),
  get_staff: () => axios.get(baseUrl + "get_staff", headers()),
  get_shops: () => axios.get(baseUrl + "get_shops", headers()),
  get_roles: () => axios.get(baseUrl + "get_roles", headers()),
  get_categories: () => axios.get(baseUrl + "get_categories", headers()),
  get_products: (params: { category: string; product_name?: string }) =>
    axios.get(baseUrl + "get_products", { params: params, ...headers() }),
  get_product: (params: { product_id: string }) =>
    axios.get(baseUrl + "get_product", { params: params, ...headers() }),
  add_products: (bodyFormData: productType) => {
    return axios({
      method: "post",
      url: baseUrl + "add_products",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  edit_product: (params: productType) =>
    axios.post(baseUrl + "edit_product", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_sale: (params: any) =>
    axios.post(baseUrl + "add_sale", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  add_category: (params: categoryType) =>
    axios.post(baseUrl + "add_category", params, headers()),
  add_shop: (params: any) =>
    axios.post(baseUrl + "add_shop", params, headers()),
  add_user: (params: {
    
  }) =>
    axios.post(baseUrl + "add_user", params, headers()),
  update_sheets: (params: any) =>
    axios.post(baseUrl + "update_sheets", params, headers()),
  send_to_archive: (params: { product_id: string }) =>
    axios.post(baseUrl + "send_to_archive", params, headers()),
  mail_report: () => axios.get(baseUrl + "mail_report", { ...headers() }),
  get_archive_products: () =>
    axios.get(baseUrl + "get_archive_products", { ...headers() }),
  remove_from_archive: (params: { product_id: string }) =>
    axios.post(baseUrl + "remove_from_archive", params, headers()),
    edit_staff: (params:{
      name: string;
      role: "1"|"2";
      shop_id: string;
      email: string,
      password: string,
    }) =>
    axios.post(baseUrl + "edit_staff", params, headers()),
  fire_an_employee: (params: { user_id: string }) =>
    {
      console.log('params',params);
      return axios.post(baseUrl + "fire_an_employee", params, headers())
    },
};


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      logout();
    }
    return error;
  }
);
