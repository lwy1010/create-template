<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
  name: "App",
  setup() {
    return { locale: zhCn };
  },
};
</script>
