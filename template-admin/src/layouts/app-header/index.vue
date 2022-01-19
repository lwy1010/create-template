<template>
  <el-header class="border-b flex border-b-light-750 justify-between items-center" height="48px">
    <div class="cursor-pointer flex items-center" @click="handleGoHome">
      <svg-icon name="vite" class="h-6 mr-2 w-6"></svg-icon>
      <div class="text-lg">Admin Template</div>
    </div>
    <div class="flex items-center">
      <el-dropdown>
        <div class="cursor-pointer flex inline-block items-center">
          <el-image :src="avatarSrc" class="rounded-1 h-6 w-6"></el-image>
          <span class="cursor-pointer flex ml-1 items-center"
            >{{ username }} <el-icon class="el-icon--right"><arrow-down></arrow-down></el-icon
          ></span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";
import { usePermissionStore } from "@/store/permission";
import { ArrowDown } from "@element-plus/icons-vue";
import SvgIcon from "@/components/svg-icon/index.vue";

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const router = useRouter();

const username = computed(() => appStore.userInfo?.name);

const avatarSrc = computed(() => {
  const defaultAvatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
  return appStore.userInfo?.avatar ?? defaultAvatar;
});

const handleLogout = () => {
  appStore.logout();
  permissionStore.resetState();
  router.push("/login");
};

const handleGoHome = () => router.push("/");
</script>
