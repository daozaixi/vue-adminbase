import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/view/login/index.vue"),
    },
    {
      path: "/",
      component: () => import("@/layout/index.vue"),
      redirect: "/users",
      children: [
        {
          path: "users",
          name: "Users",
          component: () => import("@/view/users/index.vue"),
          meta: {
            requiresAuth: true,
            title: "用户列表",
          },
        },
        {
          path: "roles",
          name: "Roles",
          component: () => import("@/view/roles/index.vue"),
          meta: {
            requiresAuth: true,
            title: "角色列表",
          },
        },
        {
          path: "categories",
          name: "categories",
          component: () => import("@/view/categories/index.vue"),
          meta: {
            requiresAuth: true,
            title: "分类列表",
          },
        },
        {
          path: "goods",
          name: "goods",
          component: () => import("@/view/goods/index.vue"),
          meta: {
            requiresAuth: true,
            title: "商品列表",
          },
        },
        {
          path: "orders",
          name: "orders",
          component: () => import("@/view/orders/index.vue"),
          meta: {
            requiresAuth: true,
            title: "订单列表",
          },
        },
        {
          path: "params",
          name: "params",
          component: () => import("@/view/params/index.vue"),
          meta: {
            requiresAuth: true,
            title: "参数列表",
          },
        },
        {
          path: "reports",
          name: "reports",
          component: () => import("@/view/reports/index.vue"),
          meta: {
            requiresAuth: true,
            title: "数据报表",
          },
        },
        {
          path: "rights",
          name: "rights",
          component: () => import("@/view/rights/index.vue"),
          meta: {
            requiresAuth: true,
            title: "权限列表",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
