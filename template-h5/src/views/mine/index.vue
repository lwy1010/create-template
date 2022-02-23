<template>
  <div @click="handleClick">我的</div>
</template>

<script setup lang="ts">
import { Toast } from "vant";
import "vant/es/toast/index.css";

const handleClick = () => {
  Toast.fail("aksdflsjflkjlk");
};
</script>
