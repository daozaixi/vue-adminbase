<script setup>
  import { ref } from "vue";
  import { Plus, Delete, Edit } from "@element-plus/icons-vue";
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">权限管理</h2>
      <div class="toolbar">
        <el-button type="primary" class="add-button">
          <el-icon><Plus /></el-icon>添加权限
        </el-button>
      </div>
    </div>

    <el-card class="content-card">
      <el-table :data="[]" style="width: 100%" border row-key="id">
        <el-table-column prop="name" label="权限名称" />
        <el-table-column prop="path" label="权限路径" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
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
