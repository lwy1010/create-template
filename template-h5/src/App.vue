<template>
  <van-config-provider :theme-vars="themeVars">
    <main>
      <router-view></router-view>
    </main>
    <tab-menu></tab-menu>
  </van-config-provider>
</template>

<script>
import { setThemeVars } from "@/plugins/vant";
import TabMenu from "@/components/tab-menu/index.vue";

export default {
  name: "App",
  components: {
    TabMenu,
  },
  setup() {
    const themeVars = setThemeVars();

    return { themeVars };
  },
};
</script>

<style lang="scss" scoped>
main {
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
</style>
