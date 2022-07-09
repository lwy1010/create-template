<template>
  <van-tabbar route fixed>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
defineOptions({ name: "TabMenu" });
</script>
