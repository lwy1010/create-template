<template>
  <el-container class="layout-pro">
    <aside-pro :collapse="isSidebarCollapse"></aside-pro>
    <el-container class="main-container">
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

<style lang="scss" scoped>
.layout-pro {
  min-height: 100vh;

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    overflow-y: scroll;

    .el-header {
      padding: 0;
      box-shadow: 0 1px 4px rgb(0 0 0 / 11%);
    }
  }
}
</style>
