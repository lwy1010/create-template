<template>
  <el-container class="min-h-screen">
    <aside-pro :collapse="isSidebarCollapse"></aside-pro>
    <el-container direction="vertical" class="h-screen overflow-y-scroll">
      <header-pro @toggle-collapse="toggleCollapse" :collapse="isSidebarCollapse"></header-pro>
      <main-pro></main-pro>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsidePro from "@/components/layout-pro/aside-pro/index.vue";
import HeaderPro from "@/components/layout-pro/header-pro/index.vue";
import MainPro from "@/components/layout-pro/main-pro/index.vue";
import { useAppStore } from "@/store/app";
import { computed, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

const appStore = useAppStore();
const { width } = useWindowSize();

watch(width, (value) => {
  if (value <= 820 && isSidebarCollapse.value === false) {
    appStore.closeCollapse();
  }
  if (value > 820 && isSidebarCollapse.value === true) {
    appStore.openCollapse();
  }
});

const isSidebarCollapse = computed(() => !appStore.sidebarStatus);

const toggleCollapse = () => appStore.toggleCollapse();
</script>
