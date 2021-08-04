<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view></router-view>
  </van-config-provider>
</template>

<script>
import { setThemeVars } from "@/plugins/vant";

export default {
  name: "App",
  setup() {
    const themeVars = setThemeVars();

    return { themeVars };
  },
};
</script>
