import axios from "axios";
import { getAccessToken } from "./auth";

const http = {
  get(url, params) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.get(url, params);
  },
  post(url, payload) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.post(url, payload);
  },
  put(url, payload) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.put(url, payload);
  },
  delete(url) {
    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token ? `Bearer ${getAccessToken()}` : "";
    return axios.delete(url);
  },
};

export default http;
