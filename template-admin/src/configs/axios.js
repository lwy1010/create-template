import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});

service.interceptors.response.use(
  ({ data }) => {
    if (data.code !== 0) {
      ElMessage.error({ message: data.message || "Error" });
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
