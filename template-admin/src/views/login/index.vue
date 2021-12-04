<template>
  <div class="flex justify-center">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="formRef"
      label-position="top"
      @keydown.enter="handleLogin"
      class="w-90 mt-35"
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
      <el-form-item class="mt-10">
        <el-button
          :loading="isLoading"
          size="medium"
          type="primary"
          @click="handleLogin"
          class="w-full"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

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
        setTimeout(() => {
          router.push({ path: "/" });
        }, 500);
      } catch (error) {
        isLoading.value = false;
      }
    }
  });
};
</script>
