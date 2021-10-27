import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

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

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    meta: { title: "嵌套菜单", icon: "menu", roles: ["admin"] },
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
];
