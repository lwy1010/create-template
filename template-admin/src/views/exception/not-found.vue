<template>
  <div class="flex flex-col items-center">
    <div class="mt-20 text-10xl font-light">404</div>
    <div class="flex flex-col items-center">
      <div class="text-base mb-6">对不起，你要访问的页面不存在！</div>
      <el-button type="primary" size="medium" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const backToHome = () => router.push({ path: "/" });
</script>
