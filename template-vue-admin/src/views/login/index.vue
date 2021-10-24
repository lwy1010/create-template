<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="formRef"
      class="login-form"
      label-position="top"
    >
      <el-form-item prop="email" label="邮箱:">
        <el-input size="medium" v-model.trim="loginForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input
          size="medium"
          v-model.trim="loginForm.password"
          placeholder="密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLoading"
          size="medium"
          class="btn"
          type="primary"
          @click="handleLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { ElMessage } from "element-plus";

export default {
  name: "Login",
  setup() {
    const appStore = useAppStore();
    const router = useRouter();

    const loginForm = reactive({
      email: "",
      password: "",
    });

    const isLoading = ref(false);

    const formRef = ref();

    const rules = {
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    const handleLogin = () => {
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          try {
            isLoading.value = true;
            await appStore.login(loginForm);
            isLoading.value = false;
            ElMessage({ type: "success", message: "登录成功" });
            router.push({ path: "/" });
          } catch (error) {
            isLoading.value = false;
          }
        }
      });
    };

    return {
      loginForm,
      rules,
      formRef,
      isLoading,
      handleLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;

  &-form {
    width: 368px;
    margin-top: 138px;

    .btn {
      margin-top: 16px;
      width: 100%;
    }
  }
}
</style>
