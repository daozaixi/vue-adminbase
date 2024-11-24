<script setup>
  import { ref, onMounted } from "vue";
  import { getMenuList } from "@/api/menu";
  import {
    User,
    Lock,
    List,
    Grid,
    ShoppingCart,
    Tickets,
    DataLine,
    Menu as MenuIcon,
  } from "@element-plus/icons-vue";

  // 创建图标映射对象
  const iconMap = {
    users: User,
    rights: Lock,
    roles: Lock,
    goods: ShoppingCart,
    params: Grid,
    categories: List,
    orders: Tickets,
    reports: DataLine,
    list: MenuIcon,
  };

  // 定义 menuList ref
  const menuList = ref([]);

  const initMenuList = async () => {
    try {
      const res = await getMenuList();
      if (res?.code === 200) {
        menuList.value = res.data;
      }
    } catch (error) {
      console.error("获取菜单列表失败:", error);
    }
  };

  onMounted(initMenuList);

  const props = defineProps({
    isCollapse: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <el-menu
    :collapse="isCollapse"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="$route.path"
    text-color="#fff"
    router
    unique-opened
  >
    <template v-for="item in menuList" :key="item.id">
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="'/' + item.path"
      >
        <template #title>
          <el-icon>
            <component :is="iconMap[item.path]" />
          </el-icon>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="'/' + child.path"
        >
          <el-icon>
            <component :is="iconMap[child.path]" />
          </el-icon>
          <span>{{ child.authName }}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="'/' + item.path">
        <el-icon>
          <component :is="iconMap[item.path]" />
        </el-icon>
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
