<script setup lang="ts">
import { useLocale } from "@/composables/useLocale";

const currentLocale = useLocale();
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view></router-view>
  </el-config-provider>
</template>
