<script setup>
  import { ref } from "vue";
  import { Plus, Delete, Edit, Search } from "@element-plus/icons-vue";

  const searchKeyword = ref("");
  const activeTab = ref("static");
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">参数管理</h2>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入参数名称"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="add-button">
          <el-icon><Plus /></el-icon>添加参数
        </el-button>
      </div>
    </div>

    <el-card class="content-card">
      <el-tabs v-model="activeTab" class="param-tabs">
        <el-tab-pane label="静态参数" name="static">
          <el-table :data="[]" style="width: 100%" border>
            <el-table-column prop="name" label="参数名称" />
            <el-table-column prop="value" label="参数值" />
            <el-table-column prop="unit" label="单位" width="120" />
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
        </el-tab-pane>

        <el-tab-pane label="动态参数" name="dynamic">
          <el-table :data="[]" style="width: 100%" border>
            <el-table-column prop="name" label="参数名称" />
            <el-table-column prop="options" label="可选值">
              <template #default>
                <el-tag v-for="tag in []" :key="tag" class="param-tag" closable>
                  {{ tag }}
                </el-tag>
                <el-button link type="primary" size="small">
                  + 新增选项
                </el-button>
              </template>
            </el-table-column>
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
        </el-tab-pane>
      </el-tabs>
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
    padding: 20px;
  }

  .add-button {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .param-tabs {
    margin-top: -10px;
  }

  .param-tag {
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>
