import { Layout } from "@/router/constants";
import { RouteRecordRaw } from "vue-router";

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "route.dashboard", icon: "dashboard", order: 1 },
    children: [
      {
        path: "/dashboard",
        meta: { title: "route.dashboard" },
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/exception",
    component: Layout,
    redirect: "/exception/403",
    meta: { title: "route.exception", icon: "error", order: 4 },
    children: [
      {
        path: "/exception/403",
        meta: { title: "route.exception403" },
        component: () => import("@/views/exception/exception403.vue"),
      },
      {
        path: "/exception/404",
        meta: { title: "route.exception404" },
        component: () => import("@/views/exception/exception404.vue"),
      },
      {
        path: "/exception/500",
        meta: { title: "route.exception500" },
        component: () => import("@/views/exception/exception500.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/exception/exception404.vue"),
    meta: { hidden: true },
  },
];
