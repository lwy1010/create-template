<template>
  <el-aside :width="asideWidth">
    <el-scrollbar>
      <el-menu
        :default-active="route.path"
        @select="handleSelect"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse-transition="false"
        :collapse="collapse"
      >
        <menu-item-pro v-for="menu in routes" :key="menu.path" :item="menu">
          <template #default="item">
            <slot v-bind="item">
              <i v-if="item.meta?.icon" :class="item.meta.icon" />
              <span v-if="item.meta?.title">{{ item.meta.title }}</span>
            </slot>
          </template>
        </menu-item-pro>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MenuItemPro from "./MenuItemPro.vue";
import { isUrl } from "@/utils/is";
import { useRoute, useRouter } from "vue-router";
import { filterHiddenRoute } from "@/utils";

export default defineComponent({
  name: "AsidePro",
  components: {
    MenuItemPro,
  },
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const asideWidth = computed(() => (props.collapse ? "54px" : "210px"));

    const routes = computed(() => filterHiddenRoute(router.options.routes));

    const handleSelect = (path: string) => (isUrl(path) ? window.open(path) : router.push(path));

    return {
      route,
      routes,
      handleSelect,
      asideWidth,
    };
  },
});
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

    /* stylelint-disable selector-class-pattern */
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
