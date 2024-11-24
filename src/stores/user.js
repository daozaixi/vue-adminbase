import { defineStore } from "pinia";
import { ref } from "vue";
import { login } from "@/api/user";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "");
  const userInfo = ref(JSON.parse(localStorage.getItem("userInfo") || "{}"));
  const loading = ref(false);

  const loginAction = async (loginForm) => {
    loading.value = true;
    try {
      const res = await login(loginForm);
      token.value = res.data.token;
      userInfo.value = res.data.userInfo;

      // 保存到本地存储
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));

      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = "";
    userInfo.value = {};
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  };

  return {
    token,
    userInfo,
    loading,
    loginAction,
    logout,
  };
});
