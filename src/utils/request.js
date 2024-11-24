import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    }

    ElMessage.error(res.message || "请求失败");
    return Promise.reject(res);
  },
  (error) => {
    ElMessage.error(error.message || "网络错误");
    return Promise.reject(error);
  }
);

export default service;
