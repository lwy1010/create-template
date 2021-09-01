import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/home/index.vue"),
    meta: { title: "首页" },
  },
  {
    name: "mine",
    path: "/mine",
    component: () => import("@/views/mine/index.vue"),
    meta: { title: "我的" },
  },
  {
    name: "notFound",
    path: "/:path(.*)+",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
