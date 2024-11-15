import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/pages/auth/LoginPage.vue";
import SignUpView from "@/pages/auth/SignUpPage.vue";
import Base from "@/pages/Base.vue";

const routes = [
  {
    path: "/CRM-System/",
    name: "base",
    component: Base,
  },
  {
    path: "/CRM-System/app/",
    name: "app-layout",
    component: () => import("@/pages/app/AppLayout.vue"),
    children: [
      {
        path: "todo",
        component: () => import("@/pages/app/TodoPage.vue"),
      },
      {
        path: "profile",
        component: () => import("@/pages/app/UserProfilePage.vue"),
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: "/CRM-System/auth/",
    name: "auth-layout",
    component: () => import("@/pages/auth/AuthLayout.vue"),
    children: [
      {
        path: "sign-up",
        component: SignUpView,
      },
      {
        path: "login",
        component: LoginView,
      },
    ],
    meta: {
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (to.meta.auth && !isAuthenticated) {
    next("/CRM-System/auth/login");
  } else if (!to.meta.auth && isAuthenticated) {
    next("/CRM-System/app/todo");
  } else {
    next();
  }
});

export default router;
