import axios from "axios";
import qs from "qs";
import { toFormData } from "@ankit_brahmbhatt/toformdata";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 300000,
  //timeout: 180000,
  //timeout: 30000,
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method === "post") {
      if (config.files !== undefined && config.files) {
        config.headers["Content-Type"] = "multipart/form-data";

        config.data = toFormData(config.data, {
          removeNullAndUndefined: true,
          useBracketsForObjects: false,
        });
      } else {
        if (config.data === undefined) {
          config.data = {};
          config.data = qs.stringify(config.data, { allowDots: true });
        } else {
          if (!(config.data instanceof FormData)) {
            config.data = qs.stringify(config.data, { allowDots: true });
          }
        }
      }
    } else {
      if (config.params === undefined) config.params = {};
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  async response => {
    const res = response.data;
    return res;
  },
  error => {
    console.log(error);
    const res = error.response.data;
    const message = res.error;
    console.error(message);
    return Promise.reject(error);
  }
);

export default service;
