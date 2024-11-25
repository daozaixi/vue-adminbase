<script setup>
  import { ref } from "vue";
  import { Plus, Delete, Edit, Setting } from "@element-plus/icons-vue";

  const searchKeyword = ref("");
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">角色管理</h2>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入角色名称"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="add-button">
          <el-icon><Plus /></el-icon>添加角色
        </el-button>
      </div>
    </div>

    <el-card class="content-card">
      <el-table :data="[]" style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default>
            <el-button type="primary" link>
              <el-icon><Setting /></el-icon>权限设置
            </el-button>
            <el-button type="primary" link>
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-button type="danger" link>
              <el-icon><Delete /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
  .container {
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    color: #303133;
    margin: 0;
  }

  .toolbar {
    display: flex;
    gap: 16px;
  }

  .search-input {
    width: 300px;
  }

  .content-card {
    background: #fff;
    border-radius: 8px;
  }

  .add-button {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
