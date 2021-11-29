<template>
  <el-menu-item
    v-if="!hasMultiChild(item) && !item.meta?.showExpand"
    :index="item.redirect || item.path"
  >
    <svg-icon v-if="item.meta?.icon" :icon-name="item.meta.icon"></svg-icon>
    <template #title>{{ item.meta?.title }}</template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template v-if="item.meta?.icon || item.meta?.title" #title>
      <svg-icon v-if="item.meta?.icon" :icon-name="item.meta.icon"></svg-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item v-for="child in item.children" :key="child.path" :item="child">
      <slot v-bind="child" />
    </menu-item>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { _RouteRecordBase } from "vue-router";

defineProps({
  item: {
    type: Object as PropType<_RouteRecordBase>,
    required: true,
  },
});

const hasMultiChild = (item: _RouteRecordBase) => {
  return item.children ? item.children.length > 1 : false;
};
</script>

<style lang="scss" scoped>
.el-menu-item {
  & * {
    vertical-align: middle;
  }
}
.svg-icon {
  margin-right: 10px;
}
</style>
