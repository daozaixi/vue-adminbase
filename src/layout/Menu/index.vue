<script setup>
  import { ref, onMounted } from "vue";
  import { getMenuList } from "@/api/menu";

  // 定义 menuList ref
  const menuList = ref([]);

  const initMenuList = async () => {
    try {
      console.log("开始获取菜单数据");
      const res = await getMenuList();
      console.log("获取到的响应:", res);

      if (res && res.code === 200) {
        menuList.value = res.data;
        console.log("设置后的menuList:", menuList.value);
      } else {
        console.error("响应格式不正确:", res);
      }
    } catch (error) {
      console.error("获取菜单列表失败:", error);
    }
  };

  onMounted(() => {
    initMenuList();
  });
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="$route.path"
    text-color="#fff"
    router
  >
    <template v-for="item in menuList" :key="item.id">
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="'/' + item.path"
      >
        <template #title>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="'/' + child.path"
        >
          {{ child.authName }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="'/' + item.path">
        <span>{{ item.authName }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
  .el-menu {
    height: 100%;
    border-right: none;
  }
</style>
