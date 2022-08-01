<script setup lang="ts">
import AppAside from "@/layout/app-aside/index.vue";
import AppHeader from "@/layout/app-header/index.vue";
import AppMain from "@/layout/app-main/index.vue";
</script>

<template>
  <el-container direction="vertical" class="h-screen">
    <app-header></app-header>
    <el-container>
      <app-aside></app-aside>
      <el-container class="h-[calc(100vh-48px)]">
        <app-main></app-main>
      </el-container>
    </el-container>
  </el-container>
</template>
