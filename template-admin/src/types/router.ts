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
  /* 是否显示菜单展开图标 */
  showExpand?: boolean;
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: CustomRouteMeta;
}
