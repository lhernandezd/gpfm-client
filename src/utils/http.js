import axios from "axios";
import { getAccessToken } from "./auth";

const http = {
  get(url) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.get(url);
  },
  post(url, payload) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.post(url, payload);
  },
  delete(url) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.delete(url);
  },
};

export default http;
