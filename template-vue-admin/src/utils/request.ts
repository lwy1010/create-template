import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});

service.interceptors.response.use(
  ({ data }) => {
    if (data.code !== 0) {
      ElMessage({ type: "error", message: data.message });

      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    if (error.message.includes("timeout")) {
      ElMessage({ type: "error", message: "网络超时" });
    }
    return Promise.reject(error);
  }
);

export default service;
