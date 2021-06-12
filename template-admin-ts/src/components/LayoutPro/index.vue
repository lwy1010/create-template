<template>
  <el-container class="layout-pro">
    <aside-pro :collapse="isSidebarCollapse"></aside-pro>
    <el-container class="main-container">
      <header-pro @toggle-collapse="toggleCollapse" :collapse="isSidebarCollapse"></header-pro>
      <main-pro></main-pro>
    </el-container>
  </el-container>
</template>

<script lant="ts">
import AsidePro from './AsidePro/index.vue';
import HeaderPro from './HeaderPro/index.vue';
import MainPro from './MainPro/index.vue';
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutPro',
  components: {
    AsidePro,
    HeaderPro,
    MainPro,
  },
  setup() {
    const store = useStore();
    const isSidebarCollapse = computed(() => !store.state.app.sidebarStatus);

    function toggleCollapse() {
      store.commit('app/toggleCollapse');
    }

    return {
      isSidebarCollapse,
      toggleCollapse,
    };
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
