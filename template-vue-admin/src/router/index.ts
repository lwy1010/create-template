import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { createRouterGuards } from "@/router/routerGuards";

import Layout from "@/layout/index.vue";

/* 
  meta : {
    // the name show in sidebar and breadcrumb
    title: 'title'
    // the icon show in the sidebar
    icon: 'svg-name' 
    // if set true, it will always show the root menu
    alwaysShow: true  
  }
*/

const routes: Array<RouteRecordRaw> = [
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
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    meta: { title: "嵌套菜单", icon: "menu" },
    children: [
      {
        path: "/nested/menu1",
        component: () => import("@/views/nested-menu/menu1/index.vue"),
        meta: { title: "菜单 1" },
        redirect: "/nested/menu1/menu1-1",
        children: [
          {
            path: "/nested/menu1/menu1-1",
            component: () => import("@/views/nested-menu/menu1/menu1-1/index.vue"),
            meta: { title: "菜单 1-1" },
          },
          {
            path: "/nested/menu1/menu1-2",
            component: () => import("@/views/nested-menu/menu1/menu1-2/index.vue"),
            redirect: "/nested/menu1/menu1-2/menu1-2-1",
            meta: { title: "菜单 1-2" },
            children: [
              {
                path: "/nested/menu1/menu1-2/menu1-2-1",
                component: () => import("@/views/nested-menu/menu1/menu1-2/menu1-2-1/index.vue"),
                meta: { title: "菜单 1-2-1" },
              },
              {
                path: "/nested/menu1/menu1-2/menu1-2-2",
                component: () => import("@/views/nested-menu/menu1/menu1-2/menu1-2-2/index.vue"),
                meta: { title: "菜单 1-2-2" },
              },
            ],
          },
          {
            path: "/nested/menu1/menu1-3",
            component: () => import("@/views/nested-menu/menu1/menu1-3/index.vue"),
            meta: { title: "菜单 1-3" },
          },
        ],
      },
      {
        path: "/nested/menu2",
        component: () => import("@/views/nested-menu/menu2/index.vue"),
        meta: { title: "菜单 2" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/exception/not-found.vue"),
    meta: { hidden: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
