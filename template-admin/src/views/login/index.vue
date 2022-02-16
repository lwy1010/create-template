<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

const appStore = useAppStore();
const router = useRouter();
const loginForm = ref({ email: "", password: "" });
const isLoading = ref(false);
const formRef = ref();

const rules = {
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, message: "密码长度不能少于8位", trigger: "blur" },
  ],
};

const handleLogin = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        isLoading.value = true;
        await appStore.login(loginForm.value);
        isLoading.value = false;
        ElMessage({ type: "success", message: "登录成功" });
        setTimeout(() => {
          router.push({ path: "/" });
        }, 500);
      } catch (error: any) {
        ElMessage({ type: "error", message: error?.msg || "登录失败" });
        isLoading.value = false;
      }
    }
  });
};
</script>

<template>
  <div class="flex justify-center">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="formRef"
      label-position="top"
      @keydown.enter="handleLogin"
      class="mt-35 w-90"
    >
      <el-form-item prop="email" label="邮箱:">
        <el-input v-model.trim="loginForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input v-model.trim="loginForm.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item class="mt-10">
        <el-button :loading="isLoading" type="primary" @click="handleLogin" class="w-full"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
