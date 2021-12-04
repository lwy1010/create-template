<template>
  <el-aside :width="asideWidth" class="h-screen bg-blue-gray-700 overflow-y-scroll">
    <el-scrollbar>
      <el-menu
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :default-active="route.path"
        @select="handleSelect"
        :collapse-transition="false"
        :collapse="collapse"
        class="!border-r-0"
      >
        <menu-item v-for="menu in routes" :key="menu.path" :item="menu"></menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import MenuItem from "./menu-item.vue";
import { isUrl } from "@/utils/is";
import { useRoute, useRouter } from "vue-router";
import { filterHiddenRoute } from "@/utils/router";
import { usePermissonStore } from "@/store/permission";

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const permissionStore = usePermissonStore();
const route = useRoute();
const router = useRouter();

const asideWidth = computed(() => (props.collapse ? "56px" : "210px"));

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
