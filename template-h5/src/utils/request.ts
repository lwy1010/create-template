import axios, { AxiosRequestConfig } from "axios";
import { Toast } from "vant";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
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
    if (config.showLoading) {
      Toast.loading({ message: "加载中...", forbidClick: true, loadingType: "spinner" });
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    Toast.clear();
    if (response.data.code !== 0) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    if (error.message.includes("timeout")) {
      Toast({ type: "fail", message: "网络超时" });
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
