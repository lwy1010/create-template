<script setup lang="ts">
import { useRouter } from "vue-router";
import exception403 from "@/assets/images/403.png";

defineOptions({ name: "Exception403" });

const router = useRouter();

const backToHome = () => router.push({ path: "/" });
</script>

<template>
  <div class="flex flex-col items-center">
    <img :src="exception403" alt="404 not found" class="h-60 mt-25 w-96" />
    <div class="flex flex-col mt-10 items-center">
      <div class="text-base mb-6 text-gray-500">抱歉，你无权访问该页面</div>
      <el-button type="primary" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>
