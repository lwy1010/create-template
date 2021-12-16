<template>
  <div class="flex flex-col items-center">
    <img :src="exception403" alt="404 not found" class="w-90 h-50 mt-25" />
    <div class="flex flex-col items-center mt-10">
      <div class="text-base mb-6 text-gray-500">抱歉，你无权访问该页面</div>
      <el-button type="primary" size="medium" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import exception403 from "@/images/403.png";

const router = useRouter();

const backToHome = () => router.push({ path: "/" });
</script>
