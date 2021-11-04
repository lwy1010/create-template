<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppMain",
});
</script>

<style lang="scss" scoped>
.el-main {
  padding: 20px;
}
</style>
