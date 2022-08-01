<script setup lang="ts">
import { Toast } from "vant";

const handleClick = () => {
  Toast.fail("Hello");
};
</script>

<template>
  <div @click="handleClick">我的</div>
</template>
