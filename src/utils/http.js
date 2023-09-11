import axios from "axios";
import { toast } from "react-toastify";

import {
  clearLS,
  getAccessTokenFromLS,
  saveAccessTokenToLS,
  setProfileToLS,
} from "./auth";
import HttpStatusCode from "./constants";

class Http {
  instance;
  accessToken;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // khi gửi request thì add thêm accessToken vào để gửi lên server
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        // setup response lưu access_token
        const { url } = response.config;
        if (url === "/login" || url === "/register") {
          this.accessToken = response.data.data?.access_token;
          saveAccessTokenToLS(response.data.data?.access_token);
          setProfileToLS(response.data.data.user);
        } else if (url === "/logout") {
          this.accessToken = "";
          clearLS();
        }
        return response;
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
