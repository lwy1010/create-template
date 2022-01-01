<template>
  <el-container direction="vertical" class="h-screen">
    <app-header></app-header>
    <el-container>
      <app-aside></app-aside>
      <el-container>
        <app-main></app-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppAside from "@/layouts/app-aside/index.vue";
import AppHeader from "@/layouts/app-header/index.vue";
import AppMain from "@/layouts/app-main/index.vue";
</script>
