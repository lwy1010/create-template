<script setup lang="ts">
import { PropType } from "vue";
import { _RouteRecordBase } from "vue-router";
import { useAppStore } from "@/store/app";
import SvgIcon from "@/components/svg-icon/index.vue";

defineProps({
  item: {
    type: Object as PropType<_RouteRecordBase>,
    required: true,
  },
});

const appStore = useAppStore();

const hasMultiChild = (item: _RouteRecordBase) => {
  return item.children ? item.children.length > 1 : false;
};
</script>

<template>
  <el-menu-item
    v-if="!hasMultiChild(item) && !item.meta?.showExpand"
    :index="item.redirect as string || item.path"
  >
    <svg-icon
      v-if="item.meta?.icon"
      :class="{ 'mr-2.5': !appStore.isSidebarCollapse }"
      :name="item.meta.icon as string"
      class="h-4 w-4"
    ></svg-icon>
    <template #title>{{ item.meta?.title }}</template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template v-if="item.meta?.icon || item.meta?.title" #title>
      <svg-icon
        v-if="item.meta?.icon"
        :class="{ 'mr-2.5': !appStore.isSidebarCollapse }"
        :name="item.meta.icon as string"
        class="h-4 w-4"
      ></svg-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item v-for="child in item.children" :key="child.path" :item="child"></menu-item>
  </el-sub-menu>
</template>

<style lang="scss">
.el-menu-item.is-active .svg-icon {
  fill: var(--el-color-primary);
}
</style>
