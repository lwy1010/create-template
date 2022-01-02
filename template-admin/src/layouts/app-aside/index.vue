<template>
  <el-aside
    :width="asideWidth"
    class="flex flex-col justify-between !box-content border-r border-r-light-700"
  >
    <el-scrollbar>
      <el-menu
        :default-active="route.path"
        @select="handleSelect"
        :collapse-transition="false"
        :collapse="appStore.isSidebarCollapse"
        class="!border-r-0"
        :class="{ '!w-14': appStore.isSidebarCollapse }"
      >
        <menu-item v-for="menu in routes" :key="menu.path" :item="menu"></menu-item>
      </el-menu>
    </el-scrollbar>
    <div class="py-3 px-5 cursor-pointer group" @click="appStore.toggleCollapse">
      <svg-icon
        :name="appStore.isSidebarCollapse ? 'indent' : 'outdent'"
        class="w-4 h-4 group-hover:fill-primary"
      ></svg-icon>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MenuItem from "./menu-item.vue";
import { isUrl } from "@/utils/is";
import { useRoute, useRouter } from "vue-router";
import { filterHiddenRoute } from "@/utils/router";
import { usePermissionStore } from "@/store/permission";
import { useAppStore } from "@/store/app";
import SvgIcon from "@/components/svg-icon/index.vue";

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const asideWidth = computed(() => (appStore.isSidebarCollapse ? "56px" : "208px"));

const routes = computed(() => filterHiddenRoute(permissionStore.routes));

const handleSelect = (path: string) => (isUrl(path) ? window.open(path) : router.push(path));
</script>

<style lang="scss" scoped>
.el-menu ::v-deep(.el-sub-menu__title) {
  &:hover {
    background-color: var(--el-menu-hover-bg-color) !important;
  }
}
.el-menu.el-menu--collapse ::v-deep(.el-menu-item *) {
  display: flex !important;
  align-items: center;
}
</style>
