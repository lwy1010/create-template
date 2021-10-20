import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/getPageTitle";
import { readUserInfo } from "@/utils/localStorage";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (readUserInfo()?.token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      NProgress.done();
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
  document.title = getPageTitle(to.meta?.title);
});
