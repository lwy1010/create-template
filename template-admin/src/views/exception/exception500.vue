<script setup lang="ts">
import { useRouter } from "vue-router";
import exception500 from "@/assets/images/500.png";

defineOptions({ name: "Exception500" });

const router = useRouter();

const backToHome = () => router.push({ path: "/" });
</script>

<template>
  <div class="flex flex-col items-center">
    <img :src="exception500" alt="404 not found" class="h-60 mt-25 w-96" />
    <div class="flex flex-col mt-10 items-center">
      <div class="text-base mb-6 text-gray-500">抱歉，服务器出错了</div>
      <el-button type="primary" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>
