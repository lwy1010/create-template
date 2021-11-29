<template>
  <el-aside :width="asideWidth">
    <el-scrollbar>
      <el-menu
        :default-active="route.path"
        @select="handleSelect"
        :collapse-transition="false"
        :collapse="collapse"
      >
        <menu-item v-for="menu in routes" :key="menu.path" :item="menu">
          <template #default="item">
            <slot v-bind="item">
              <i v-if="item.meta?.icon" :class="item.meta.icon" />
              <span v-if="item.meta?.title">{{ item.meta.title }}</span>
            </slot>
          </template>
        </menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import MenuItem from "./menu-item.vue";
import { isUrl } from "@/utils/is";
import { useRoute, useRouter } from "vue-router";
import { filterHiddenRoute } from "@/utils/router";
import { usePermissonStore } from "@/store/permission";

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const permissionStore = usePermissonStore();
const route = useRoute();
const router = useRouter();

const asideWidth = computed(() => (props.collapse ? "56px" : "210px"));

const routes = computed(() => filterHiddenRoute(permissionStore.routes));

const handleSelect = (path: string) => (isUrl(path) ? window.open(path) : router.push(path));
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background: #304156;
  overflow-y: scroll;

  .el-menu {
    border-right: none;
    &.el-menu--collapse {
      width: 54px;
      .el-menu-item,
      .el-submenu {
        width: 54px;
      }
    }

    & ::v-deep(.el-menu.el-menu--inline .el-menu-item),
    & ::v-deep(.el-submenu .el-submenu .el-submenu__title) {
      background: #1f2d3d !important;
      &:hover {
        background: #001528 !important;
      }
    }
  }
}
</style>
