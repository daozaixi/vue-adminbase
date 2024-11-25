<script setup>
  import { ref } from "vue";
  import { Plus, Delete, Edit } from "@element-plus/icons-vue";

  const searchKeyword = ref("");
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">商品分类</h2>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入分类名称"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="add-button">
          <el-icon><Plus /></el-icon>添加分类
        </el-button>
      </div>
    </div>

    <el-card class="content-card">
      <el-table
        :data="[]"
        style="width: 100%"
        border
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="level" label="层级" width="120" />
        <el-table-column prop="sort" label="排序" width="120" />
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
