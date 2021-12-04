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

    <div class="mr-5">
      <el-dropdown trigger="click">
        <span class="flex items-center cursor-pointer"
          >{{ username }}<el-icon class="el-icon--right"><arrow-down></arrow-down> </el-icon
        ></span>
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
import { usePermissonStore } from "@/store/permission";
import { ArrowDown } from "@element-plus/icons";

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["toggle-collapse"]);

const appStore = useAppStore();
const permissionStore = usePermissonStore();
const router = useRouter();

const username = computed(() => appStore.userInfo?.name);

const handleLogout = () => {
  appStore.logout();
  permissionStore.resetState();
  router.push("/login");
};
</script>
