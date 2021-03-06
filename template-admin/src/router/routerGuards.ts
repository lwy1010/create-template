import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "vue-router";
import { useAppStore } from "@/store/app";
import { usePermissionStore } from "@/store/permission";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const appStore = useAppStore();
    const permissionStore = usePermissionStore();
    NProgress.start();

    if (appStore?.userInfo?.token) {
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        if (permissionStore.isAddedAsyncRoutes) {
          next();
        } else {
          try {
            permissionStore.generateRoutes(appStore.roles);
            permissionStore.asyncRoutes.forEach((asyncRoute) => {
              router.addRoute(asyncRoute);
            });
            permissionStore.setIsAddedAsyncRoutes(true);
            next({ ...to, replace: true });
          } catch (error) {
            appStore.logout();
            next("/login");
            NProgress.done();
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next({ path: "/login" });
        NProgress.done();
      }
    }
  });

  router.afterEach((to) => {
    NProgress.done();
    document.title = (to.meta?.title as string) || "template-admin";
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
