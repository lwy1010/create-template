import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 10000,
});

service.interceptors.response.use(
  ({ data }) => {
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
