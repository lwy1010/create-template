<template>
  <el-main class="bg-gray-100 text-sm app-main !p-3">
    <router-view></router-view>
    <el-backtop target=".app-main"></el-backtop>
  </el-main>
</template>

<script lang="ts" setup>
defineOptions({ name: "AppMain" });
</script>
