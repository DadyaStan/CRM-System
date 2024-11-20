import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/CRM-System/",
    name: "base",
    component: () => import("@/pages/Base.vue"),
    beforeEnter: (_to: any, _from: any, next: (arg0: string) => void) => {
      next("/CRM-System/auth/login");
    },
  },
  {
    path: "/CRM-System/app/",
    name: "app-layout",
    component: () => import("@/components/layout/AppLayout.vue"),
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
        component: () => import("@/pages/auth/SignUpPage.vue"),
      },
      {
        path: "login",
        component: () => import("@/pages/auth/LoginPage.vue"),
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
  const isAuthenticated = localStorage.getItem("refreshToken");

  if (to.meta.auth && !isAuthenticated) {
    next("/CRM-System/auth/login");
  } else if (!to.meta.auth && isAuthenticated) {
    next("/CRM-System/app/todo");
  } else {
    next();
  }
});

export default router;
