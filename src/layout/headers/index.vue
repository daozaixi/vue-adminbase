<script setup>
  import { useUserStore } from "@/stores/user";
  import { useRouter } from "vue-router";
  import Breadcrumb from "../components/Breadcrumb.vue";
  import { Fold, Expand } from "@element-plus/icons-vue";

  const props = defineProps({
    isCollapse: {
      type: Boolean,
      default: false,
    },
  });

  const userStore = useUserStore();
  const router = useRouter();
  const emit = defineEmits(["toggle-sidebar"]);

  const handleLogout = () => {
    userStore.logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    emit("toggle-sidebar");
  };
</script>

<template>
  <div class="header-container">
    <div class="header-left">
      <div class="fold-btn" @click="toggleSidebar">
        <el-icon>
          <Fold v-if="!props.isCollapse" />
          <Expand v-else />
        </el-icon>
      </div>
      <Breadcrumb />
    </div>

    <div class="header-right">
      <el-dropdown trigger="click">
        <div class="user-info">
          <el-avatar :size="32" src="https://example.com/avatar.jpg" />
          <span class="username">{{ userStore.userInfo.nickname }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0;
    background: #fff;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .fold-btn {
    padding: 0 20px;
    cursor: pointer;
    font-size: 20px;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .fold-btn:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    height: 40px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .user-info:hover {
    background-color: #f5f5f5;
  }

  .username {
    margin-left: 8px;
    font-size: 14px;
    color: #333;
  }

  :deep(.el-dropdown-menu__item) {
    padding: 8px 20px;
  }

  :deep(.el-avatar) {
    background-color: #1eb392;
  }
</style>
