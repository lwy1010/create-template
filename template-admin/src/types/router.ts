import { RouteMeta } from "vue-router";

export interface CustomRouteMeta extends RouteMeta {
  roles?: string[];
}
