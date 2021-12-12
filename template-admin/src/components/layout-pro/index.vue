<template>
  <el-container class="min-h-screen">
    <aside-pro></aside-pro>
    <el-container direction="vertical" class="h-screen overflow-y-scroll">
      <header-pro></header-pro>
      <main-pro></main-pro>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsidePro from "@/components/layout-pro/aside-pro/index.vue";
import HeaderPro from "@/components/layout-pro/header-pro/index.vue";
import MainPro from "@/components/layout-pro/main-pro/index.vue";
</script>
