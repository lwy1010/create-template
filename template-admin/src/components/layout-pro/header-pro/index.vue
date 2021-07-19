<template>
  <el-header height="48px">
    <div class="left-menu">
      <div class="menu-fold" :class="{ collapse }" @click="$emit('toggle-collapse')">
        <svg-icon icon-name="outdent"></svg-icon>
      </div>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-menu">
      <div class="dropdown-menu">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link"
            >{{ username }}<i class="el-icon-arrow-down el-icon--right"
          /></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/breadcrumb/index.vue";

export default {
  name: "HeaderPro",
  components: {
    Breadcrumb,
  },
  emits: ["toggle-collapse"],
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const username = computed(() => store.state.app.userInfo?.name);

    const handleLogout = () => {
      store
        .dispatch("app/logout")
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          Promise.reject(error);
        });
    };

    return { username, handleLogout };
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-menu {
    display: flex;
    align-items: center;

    .menu-fold {
      font-size: 16px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background: rgba(145, 89, 89, 0.045);
      }
      &.collapse {
        transform: rotate(180deg);
      }
    }

    .el-breadcrumb {
      margin-left: 4px;
      font-size: 13px;
    }
  }

  .right-menu {
    .dropdown-menu {
      margin-right: 20px;
      .el-dropdown-link {
        cursor: pointer;
      }
    }
  }
}
</style>
