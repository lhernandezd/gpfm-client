import axios from "axios";
import { getAccessToken } from "./auth";

const token = getAccessToken();

axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";

const http = {
  get(url) {
    return axios.get(url);
  },
  post(url, payload) {
    return axios.post(url, payload);
  },
  delete(url) {
    return axios.delete(url);
  },
};

export default http;
