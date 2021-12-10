import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { asyncRoutes } from "@/router/asyncRoutes";
import { constantRoutes } from "@/router/constantRoutes";
import { filterAsyncRoutes } from "@/utils/router";

interface PermissionStoreState {
  routes: RouteRecordRaw[];
  asyncRoutes: RouteRecordRaw[];
  isAddedAsyncRoutes: boolean;
}

export const usePermissionStore = defineStore("permission", {
  state(): PermissionStoreState {
    return {
      routes: [],
      asyncRoutes: [],
      isAddedAsyncRoutes: false,
    };
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = [...constantRoutes, ...routes];
      this.asyncRoutes = routes;
    },
    resetState() {
      this.setIsAddedAsyncRoutes(false);
      this.asyncRoutes = [];
      this.routes = [];
    },
    setIsAddedAsyncRoutes(isAdded: boolean) {
      this.isAddedAsyncRoutes = isAdded;
    },
    generateRoutes(roles: string[]) {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes;
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      this.setRoutes(accessedRoutes);
    },
  },
});
