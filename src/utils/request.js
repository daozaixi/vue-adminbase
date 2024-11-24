import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data; //直接返回数据
  },
  (error) => {
    ElMessage.error(error.message || "网络错误");
    return Promise.reject(error);
  }
);

export default service;
