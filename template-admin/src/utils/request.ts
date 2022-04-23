import axios, { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import * as storage from "./localStorage";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  /* default: false */
  hideLoading?: boolean;
}

interface CustomResponse<T> {
  code: number;
  data: T;
  msg: string;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});

service.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const token = storage.readUserInfo()?.token;
    if (token && config.headers) config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    if (error.message.includes("timeout")) {
      ElMessage({ type: "error", message: "网络超时" });
    }
    return Promise.reject(error);
  }
);

const request = <T>(config: CustomAxiosRequestConfig): Promise<CustomResponse<T>> => {
  return new Promise((resolve, reject) => {
    service
      .request<CustomResponse<T>>(config)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export default request;
