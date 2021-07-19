<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="formRef"
      class="login-form"
      label-position="top"
    >
      <el-form-item prop="username" label="用户名:">
        <el-input size="medium" v-model.trim="loginForm.username" placeholder="用户名"></el-input>
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
        <el-button size="medium" class="btn" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();

    const loginForm = reactive({
      username: "",
      password: "",
    });

    const formRef = ref();

    const rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    const handleLogin = () => {
      formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            await store.dispatch("app/login", loginForm);
            router.push({ path: "/" });
          } catch (error) {
            console.log(error);
          }
        }
      });
    };

    return {
      loginForm,
      rules,
      formRef,
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
