<script setup lang="ts">
import TabMenu from "@/components/tab-menu/index.vue";
</script>

<template>
  <main class="h-[calc(100vh-50px)] overflow-y-scroll">
    <router-view></router-view>
  </main>
  <tab-menu></tab-menu>
</template>
