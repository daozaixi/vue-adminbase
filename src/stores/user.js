import { defineStore } from "pinia";
import { ref } from "vue";
import { login, getUsers, addUser, updateUser, deleteUser } from "@/api/user";
import { ElMessage } from "element-plus";
export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "");
  const userInfo = ref(JSON.parse(localStorage.getItem("userInfo") || "{}"));
  const loading = ref(false);
  const userList = ref([]);

  // 登录相关
  const loginAction = async (loginForm) => {
    loading.value = true;
    try {
      const res = await login(loginForm);
      token.value = res.data.token;
      userInfo.value = res.data.userInfo;
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

  // 用户管理相关
  const getUserList = async () => {
    loading.value = true;
    try {
      const result = await getUsers();
      if (result.code === 200) {
        userList.value = result.data;
        return result.data;
      }
      throw new Error(result.message);
    } catch (error) {
      ElMessage.error(error.message || "获取用户列表失败");
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const addNewUser = async (userData) => {
    try {
      const res = await addUser(userData);
      if (res.code === 200) {
        await getUserList();
        return res.data;
      }
      throw new Error(res.message);
    } catch (error) {
      ElMessage.error(error.message || "添加用户失败");
      throw error;
    }
  };

  const updateUserInfo = async (id, userData) => {
    try {
      const res = await updateUser(id, userData);
      if (res.code === 200) {
        await getUserList();
        return res.data;
      }
      throw new Error(res.message);
    } catch (error) {
      ElMessage.error(error.message || "更新用户失败");
      throw error;
    }
  };

  const removeUser = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.code === 200) {
        await getUserList();
        return true;
      }
      throw new Error(res.message);
    } catch (error) {
      ElMessage.error(error.message || "删除用户失败");
      throw error;
    }
  };

  return {
    // 状态
    token,
    userInfo,
    loading,
    userList,
    // 方法
    loginAction,
    logout,
    getUserList,
    addNewUser,
    updateUserInfo,
    removeUser,
  };
});
