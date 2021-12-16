import { RouteMeta, RouteRecordRaw } from "vue-router";

export interface CustomRouteMeta extends RouteMeta {
  /* 菜单标题 */
  title?: string;
  /* 菜单图标 */
  icon?: string;
  /* 角色权限 */
  roles?: string[];
  /* 菜单排序号 */
  order: number;
  /* 是否为隐藏路由 */
  hidden?: boolean;
  /*  */
  alwaysShow?: true;
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: CustomRouteMeta;
}
