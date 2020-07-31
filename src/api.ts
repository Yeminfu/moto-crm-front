import axios from "axios";

const baseUrl = "http://birmotqe.beget.tech/api/?service=";

export const API = {
  login: (login: string, password: string) =>
    axios.post(baseUrl + "login", { login, password }),
  report: (params: any) => axios.get(baseUrl + "report", { params: params }),
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
};

(() => {
  axios("http://birmotqe.beget.tech/api/?service=report", {
    // params: { a: "asd" },
  }).then((response) => console.log("response", response));
})();

(() => {
  return null;
  axios
    .post(
      "http://birmotqe.beget.tech/api/?service=add_sale",
      {
        product_id: 1,
        shop_id: "khv",
        saler_id: 1,
        count: 1,
        sum: 200500,
        // service: "add_sale",
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(function (response) {
      console.log(12, response);
    })
    .catch(function (error) {
      console.log(13, error);
    });
})();
