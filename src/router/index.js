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
          meta: { requiresAuth: true },
        },
        {
          path: "roles",
          name: "Roles",
          component: () => import("@/view/roles/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "categories",
          name: "categories",
          component: () => import("@/view/categories/index.vue"),
        },
        {
          path: "goods",
          name: "goods",
          component: () => import("@/view/goods/index.vue"),
        },
        {
          path: "orders",
          name: "orders",
          component: () => import("@/view/orders/index.vue"),
        },
        {
          path: "params",
          name: "params",
          component: () => import("@/view/params/index.vue"),
        },
        {
          path: "reports",
          name: "reports",
          component: () => import("@/view/reports/index.vue"),
        },
        {
          path: "rights",
          name: "rights",
          component: () => import("@/view/rights/index.vue"),
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
