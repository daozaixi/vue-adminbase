<script setup>
  import { ref } from "vue";
  import { Search, Plus, Delete, Edit } from "@element-plus/icons-vue";

  const searchKeyword = ref("");
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">商品管理</h2>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入搜索关键词"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="add-button">
          <el-icon><Plus /></el-icon>添加商品
        </el-button>
      </div>
    </div>

    <el-card class="content-card">
      <el-table :data="[]" style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="价格" width="120" />
        <el-table-column prop="stock" label="库存" width="120" />
        <el-table-column prop="status" label="状态" width="120" />
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
