<template>
  <el-aside :width="asideWidth" class="h-screen flex flex-col justify-between bg-blue-gray-700">
    <el-scrollbar>
      <el-menu
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
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
    <div class="py-2 px-5 cursor-pointer group" @click="appStore.toggleCollapse">
      <svg-icon
        :icon-name="appStore.isSidebarCollapse ? 'indent' : 'outdent'"
        class="!fill-white opacity-60 group-hover:opacity-100"
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
