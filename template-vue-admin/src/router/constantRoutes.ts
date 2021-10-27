import Layout from "@/layout/index.vue";
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
    meta: { title: "首页", icon: "dashboard" },
    children: [
      {
        path: "/dashboard",
        meta: { title: "控制台" },
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/exception/not-found.vue"),
    meta: { hidden: true },
  },
];
