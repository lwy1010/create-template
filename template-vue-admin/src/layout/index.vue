<template>
  <el-container class="layout-pro">
    <app-aside :collapse="isSidebarCollapse"></app-aside>
    <el-container class="main-container">
      <app-header @toggle-collapse="toggleCollapse" :collapse="isSidebarCollapse"></app-header>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import AppAside from "@/layout/app-aside/index.vue";
import AppHeader from "@/layout/app-header/index.vue";
import AppMain from "@/layout/app-main/index.vue";
import { useAppStore } from "@/store/app";
import { defineComponent, computed, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

export default defineComponent({
  name: "Layout",
  components: {
    AppAside,
    AppHeader,
    AppMain,
  },
  setup() {
    const appStore = useAppStore();
    const { width } = useWindowSize();

    watch(width, (value) => {
      if (value <= 820 && isSidebarCollapse.value === false) {
        appStore.closeCollapse();
      }
      if (value > 820 && isSidebarCollapse.value === true) {
        appStore.closeCollapse();
      }
    });

    const isSidebarCollapse = computed(() => !appStore.sidebarStatus);

    const toggleCollapse = () => appStore.toggleCollapse();

    return { isSidebarCollapse, toggleCollapse };
  },
});
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
