<template>
  <el-menu-item
    v-if="!hasMultiChild(item) && !item.meta.showExpand"
    :index="item.redirect || item.path"
  >
    <svg-icon v-if="item.meta?.icon" :icon-name="item.meta.icon"></svg-icon>
    <template #title>{{ item.meta?.title }}</template>
  </el-menu-item>
  <el-submenu v-else :index="item.path">
    <template v-if="item.meta?.icon || item.meta?.title" #title>
      <svg-icon v-if="item.meta?.icon" :icon-name="item.meta.icon"></svg-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <menu-item v-for="child in item.children" :key="child.path" :item="child">
      <slot v-bind="child" />
    </menu-item>
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { _RouteRecordBase } from "vue-router";

export default defineComponent({
  name: "MenuItem",
  props: {
    item: {
      type: Object as PropType<_RouteRecordBase>,
      required: true,
    },
  },
  setup() {
    const hasMultiChild = (item: _RouteRecordBase) => {
      return item.children ? item.children.length > 1 : false;
    };

    return { hasMultiChild };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
</style>
