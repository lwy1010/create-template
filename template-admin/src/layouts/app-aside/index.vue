<template>
  <el-aside :width="asideWidth" class="border-r border-r-light-700">
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
</style>
