<script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user";
  import { ElMessage } from "element-plus";
  import { User, Lock, View, Hide } from "@element-plus/icons-vue";

  const router = useRouter();
  const userStore = useUserStore();
  const formRef = ref(null);
  const passwordVisible = ref(false);

  const loginForm = reactive({
    username: "admin",
    password: "123456",
  });

  const rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
    ],
  };

  const handleLogin = async () => {
    if (!formRef.value) return;

    try {
      await formRef.value.validate();
      await userStore.loginAction(loginForm);
      ElMessage.success("登录成功");
      router.push("/");
    } catch (error) {
      ElMessage.error("登录失败:", error);
    }
  };

  const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value;
  };
</script>

<template>
  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <el-icon class="svg-container">
          <User />
        </el-icon>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名: admin"
          name="username"
          type="text"
          aria-label="username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-icon class="svg-container">
          <Lock />
        </el-icon>
        <el-input
          v-model="loginForm.password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="请输入密码"
          name="password"
          aria-label="password"
        />
        <el-icon class="show-pwd" @click="togglePasswordVisible">
          <View v-if="passwordVisible" />
          <Hide v-else />
        </el-icon>
      </el-form-item>

      <el-button
        :loading="userStore.loading"
        type="primary"
        class="login-button"
        @click="handleLogin"
      >
        {{ userStore.loading ? "登录中..." : "登录" }}
      </el-button>
    </el-form>
  </div>
</template>

<style scoped>
  /* 调整容器样式 */
  .login-container {
    height: 100vh;
    width: 100vw;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form {
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  }

  /* 调整表单项样式 */
  :deep(.el-form-item) {
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
  }

  /* 调整输入框容器样式 */
  :deep(.el-input) {
    width: 100%;
  }

  :deep(.el-input__wrapper) {
    padding: 0;
    box-shadow: none !important;
    background: transparent;
  }

  :deep(.el-input__inner) {
    height: 40px;
    line-height: 40px;
    padding-left: 40px !important; /* 为图标留出空间 */
  }

  /* 调整图标容器样式 */
  .svg-container {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #909399;
    z-index: 1;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* 调整密码显示图标样式 */
  .show-pwd {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #909399;
    cursor: pointer;
    z-index: 1;
    font-size: 16px;
  }

  /* 调整标题样式 */
  .title-container {
    text-align: center;
    margin-bottom: 30px;
  }

  .title {
    font-size: 24px;
    color: #333;
    margin: 0;
    font-weight: 500;
  }

  /* 调整按钮样式 */
  .login-button {
    width: 100%;
    margin-top: 20px;
    background: #1eb392;
    border: none;
    padding: 12px;
    height: 45px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .login-button:hover {
    opacity: 0.9;
  }
</style>
