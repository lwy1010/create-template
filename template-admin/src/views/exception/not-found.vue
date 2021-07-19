<template>
  <div class="not-found">
    <div class="title">404</div>
    <div class="tips">
      <div class="tip">对不起，你要访问的页面不存在！</div>
      <el-button class="btn" type="primary" size="medium" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NotFound",
  setup() {
    const router = useRouter();

    return {
      backToHome: () => router.push({ path: "/" }),
    };
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 160px;
    font-weight: 300;
    margin-top: 38px;
  }

  .tips {
    display: flex;
    flex-direction: column;
    align-items: center;

    .tip {
      font-size: 16px;
      color: #909399;
    }

    .btn {
      width: 168px;
      margin-top: 36px;
    }
  }
}
</style>
