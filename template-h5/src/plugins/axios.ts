import axios, { AxiosRequestConfig } from "axios";
import { Toast } from "vant";

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
    if (!config.hideLoading) {
      Toast.loading({ loadingType: "spinner", duration: 0, forbidClick: true });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.data?.code !== 0) {
      Toast.fail(response.data?.message || "服务出错了:(");
      return Promise.reject(response);
    }
    Toast.clear();
    return response;
  },
  (error) => {
    Toast.clear();
    Toast.fail("服务出错了:(");
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
