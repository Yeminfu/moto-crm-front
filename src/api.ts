import axios from "axios";

const baseUrl = "http://10.0.0.29:3001/api/";

export const API = {
  login: (login: string, password: string) =>
    axios.post(baseUrl + "login", { login, password }),
  report: (params: { category: "boats" }) =>
    axios.get(baseUrl + "report", { params: params }),
};
