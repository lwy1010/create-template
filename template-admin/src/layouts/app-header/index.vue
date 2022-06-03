<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store/app";
import { useRoute, useRouter } from "vue-router";
import { usePermissionStore } from "@/store/permission";
import { ArrowDown } from "@element-plus/icons-vue";
import SvgIcon from "@/components/svg-icon/index.vue";
import { Language } from "@/enums";
import { useI18n } from "vue-i18n";
import { i18n } from "@/plugins/i18n";

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const router = useRouter();
const { locale } = useI18n();
const route = useRoute();

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

const handleToggleLanguage = (lang: Language) => {
  locale.value = lang;
  document.title = i18n.global.t(route.meta?.title as string) || "template-admin";
  appStore.setCurrentLanguage(lang);
};

const handleGoHome = () => router.push("/");
</script>

<template>
  <el-header
    class="border-b flex h-full border-b-light-750 justify-between items-center"
    height="48px"
  >
    <div class="cursor-pointer flex items-center" @click="handleGoHome">
      <svg-icon name="vite" class="h-6 mr-2 w-6"></svg-icon>
      <div class="text-lg">Admin Template</div>
    </div>
    <div class="flex h-full items-center">
      <div class="cursor-pointer flex h-full px-2 items-center hover:bg-gray-100">
        <el-dropdown trigger="click">
          <svg-icon name="translate" class="h-5 w-5"></svg-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :class="{ checked: appStore.currentLanguage === Language.zhCN }"
                @click="handleToggleLanguage(Language.zhCN)"
                >简体中文</el-dropdown-item
              >
              <el-dropdown-item
                :class="{ checked: appStore.currentLanguage === Language.en }"
                @click="handleToggleLanguage(Language.en)"
                >English</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex h-full px-2 items-center hover:bg-gray-100">
        <el-dropdown trigger="click">
          <div class="cursor-pointer flex inline-block items-center">
            <el-image :src="avatarSrc" class="rounded-1 h-6 w-6"></el-image>
            <span class="cursor-pointer flex ml-1 items-center"
              >{{ username }} <el-icon class="el-icon--right"><arrow-down></arrow-down></el-icon
            ></span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">{{ $t("common.logout") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<style lang="scss">
.checked {
  color: var(--el-dropdown-menuItem-hover-color);
}
</style>
