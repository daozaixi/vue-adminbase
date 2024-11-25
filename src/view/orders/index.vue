<script setup>
  import { ref } from "vue";
  import { Search, View } from "@element-plus/icons-vue";

  const searchKeyword = ref("");
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">订单管理</h2>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入订单号"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <el-card class="content-card">
      <el-table :data="[]" style="width: 100%" border>
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="customer" label="客户名称" />
        <el-table-column prop="amount" label="订单金额" width="120" />
        <el-table-column prop="status" label="订单状态" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button type="primary" link>
              <el-icon><View /></el-icon>查看详情
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
</style>
