<template>
  <van-tabbar route fixed class="tabbar">
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "TabMenu",
  setup() {},
};
</script>

<style lang="scss" scoped>
.van-tabbar {
  height: 50px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
