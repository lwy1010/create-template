<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script lant="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPro',
});
</script>

<style lang="scss" scoped>
.el-main {
  padding: 20px;
}
</style>
