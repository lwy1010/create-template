import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createRouterGuards } from "@/router/routerGuards";
import { constantRoutes } from "@/router/constantRoutes";

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: constantRoutes,
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
