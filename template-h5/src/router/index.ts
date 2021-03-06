import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/home/index.vue"),
    meta: { title: "้ฆ้กต" },
  },
  {
    name: "mine",
    path: "/mine",
    component: () => import("@/views/mine/index.vue"),
    meta: { title: "ๆ็" },
  },
  {
    name: "notFound",
    path: "/:path(.*)+",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
});

router.beforeEach((to, from, next) => {
  const title = (to.meta?.title as string) || "template-h5";
  document.title = title;
  next();
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
