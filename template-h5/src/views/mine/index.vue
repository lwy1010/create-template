<template>
  <div @click="handleClick">我的</div>
</template>

<script setup lang="ts">
import { Toast } from "vant";

defineOptions({ name: "Mine" });

const handleClick = () => {
  Toast.fail("Hello");
};
</script>
