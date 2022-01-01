import { Layout } from "@/router/constants";
import { RouteRecordRaw } from "vue-router";

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "首页", icon: "dashboard", order: 1 },
    children: [
      {
        path: "/dashboard",
        meta: { title: "首页" },
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/exception",
    component: Layout,
    redirect: "/exception/403",
    meta: { title: "异常页", icon: "error", order: 3 },
    children: [
      {
        path: "/exception/403",
        meta: { title: "403" },
        component: () => import("@/views/exception/exception403.vue"),
      },
      {
        path: "/exception/404",
        meta: { title: "404" },
        component: () => import("@/views/exception/exception404.vue"),
      },
      {
        path: "/exception/500",
        meta: { title: "500" },
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
