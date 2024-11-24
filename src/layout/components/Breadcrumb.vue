<script setup>
  import { ref, watch } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const breadcrumbs = ref([]);

  const getBreadcrumb = () => {
    const matched = route.matched.filter(
      (item) => item.meta && item.meta.title
    );
    breadcrumbs.value = matched;
  };

  // 监听路由变化
  watch(
    () => route.path,
    () => getBreadcrumb(),
    { immediate: true }
  );
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
  .el-breadcrumb {
    line-height: 60px;
    padding-left: 20px;
  }
</style>
