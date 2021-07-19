<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
      <router-link :to="item.path">
        {{ item.meta?.title }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { filterHiddenRoute, findRouteItemByPath } from "@/utils";
import { uniqBy } from "lodash-es";

export default {
  name: "Breadcrumb",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const routes = computed(() => filterHiddenRoute(router.options.routes));

    const breadcrumbList = computed(() => {
      const filteredRoutes = findRouteItemByPath(routes.value, route.path);
      return uniqBy([{ path: "/", meta: { title: "首页" } }, ...filteredRoutes], "path");
    });

    return { breadcrumbList };
  },
};
</script>
