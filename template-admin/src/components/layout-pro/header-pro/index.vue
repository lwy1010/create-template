<template>
  <el-header class="!p-0 flex justify-between items-center shadow shadow-gray-600" height="48px">
    <div class="flex items-center">
      <div
        class="p-4 cursor-pointer hover:bg-true-gray-10 transform"
        :class="{ 'rotate-180': collapse }"
        @click="$emit('toggle-collapse')"
      >
        <svg-icon icon-name="outdent"></svg-icon>
      </div>
      <breadcrumb></breadcrumb>
    </div>

    <div class="flex items-center mr-5">
      <el-dropdown>
        <div class="inline-block flex items-center cursor-pointer">
          <el-image :src="avatarSrc" class="w-6 h-6"></el-image>
          <span class="flex items-center cursor-pointer ml-1">{{ username }}</span>
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
import { computed, defineProps, defineEmits } from "vue";
import { useAppStore } from "@/store/app";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import { usePermissionStore } from "@/store/permission";
import SvgIcon from "@/components/svg-icon/index.vue";

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["toggle-collapse"]);

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
</script>
