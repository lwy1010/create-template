import { RouteRecordRaw } from "vue-router";
import { CustomRouteMeta } from "@/types/router";
import { sortBy } from "lodash-es";

export function filterHiddenRoute(routes: Array<RouteRecordRaw>) {
  const routeList: Array<RouteRecordRaw> = [];
  routes.forEach((route) => {
    if (!route.meta?.hidden) {
      if (route?.children) {
        route.children = filterHiddenRoute(route.children);
      }
      routeList.push(route);
    }
  });
  return routeList;
}

export function findRouteItemByPath(routes: Array<RouteRecordRaw>, path: string) {
  let routeList: Array<RouteRecordRaw> = [];
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (item.path === path) {
      routeList = [item];
      break;
    } else {
      if (item?.children) {
        const children = findRouteItemByPath(item.children, path);
        if (children.length) {
          routeList = [item, ...children];
          break;
        }
      }
    }
  }
  return routeList;
}

export function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route?.meta?.roles) {
    return roles.some((role) => (route.meta as CustomRouteMeta).roles?.includes(role));
  } else {
    return true;
  }
}

export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const filterRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      filterRoutes.push(tmp);
    }
  });
  return filterRoutes;
}

/**
 * @description 排序侧边栏菜单
 */
export function orderRoutes(routes: RouteRecordRaw[]) {
  const showingRoutes = routes.filter((route) => !route.meta?.hidden);
  return sortBy(showingRoutes, (item) => item.meta?.order);
}
