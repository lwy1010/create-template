import { Layout } from "@/router/constants";
import { RouteRecordRaw } from "vue-router";

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    meta: { title: "route.nested-menu", icon: "menu", roles: ["admin"], order: 2 },
    children: [
      {
        path: "/nested/menu1",
        component: () => import("@/views/nested-menu/menu1/index.vue"),
        meta: { title: "route.nested-menu-1" },
        redirect: "/nested/menu1/menu1-1",
        children: [
          {
            path: "/nested/menu1/menu1-1",
            component: () => import("@/views/nested-menu/menu1/menu1-1/index.vue"),
            meta: { title: "route.nested-menu-1-1" },
          },
          {
            path: "/nested/menu1/menu1-2",
            component: () => import("@/views/nested-menu/menu1/menu1-2/index.vue"),
            meta: { title: "route.nested-menu-1-2" },
          },
        ],
      },
      {
        path: "/nested/menu2",
        component: () => import("@/views/nested-menu/menu2/index.vue"),
        meta: { title: "route.nested-menu-2" },
      },
    ],
  },
  {
    path: "/curd",
    component: Layout,
    redirect: "/curd/demo",
    meta: { title: "route.list", icon: "table", order: 3, showExpand: true },
    children: [
      {
        path: "/curd/demo",
        meta: { title: "route.list-demo" },
        component: () => import("@/views/curd-demo/index.vue"),
      },
    ],
  },
];
