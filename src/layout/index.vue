<script setup>
  import Menu from "./Menu/index.vue";
</script>

<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside width="250px" class="layout-aside">
        <Menu />
      </el-aside>
      <el-container class="layout-right">
        <el-header class="layout-header">Header</el-header>
        <el-main class="layout-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  .common-layout {
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  .layout-container {
    height: 100vh;
  }

  .layout-aside {
    background-color: #515a6e;
    color: #fff;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: all 0.3s;
  }

  .layout-right {
    background-color: #f0f2f5;
  }

  .layout-header {
    background-color: #fff;
    color: #333;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 0 20px;
    position: relative;
    z-index: 10;
  }

  .layout-main {
    padding: 24px;
    background-color: #fff;
    margin: 24px;
    border-radius: 4px;
    min-height: calc(100vh - 120px);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }

  :deep(.el-menu) {
    border-right: none;
    background-color: transparent;
  }

  :deep(.el-menu-item) {
    color: #a6adb4;
    height: 50px;
    line-height: 50px;
  }

  :deep(.el-menu-item:hover) {
    color: #fff;
    background-color: #434a5a;
  }

  :deep(.el-menu-item.is-active) {
    color: #ffd04b;
    background-color: #434a5a;
  }
</style>
