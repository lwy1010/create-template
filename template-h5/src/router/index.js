import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "cart",
    path: "/cart",
    component: () => import("../views/cart/index.vue"),
    meta: { title: "购物车" },
  },
  {
    name: "goods",
    path: "/goods",
    component: () => import("../views/goods/index.vue"),
    meta: { title: "商品详情" },
  },
  {
    name: "notFound",
    path: "/:path(.*)+",
    redirect: { name: "goods" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
