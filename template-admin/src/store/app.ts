import { defineStore } from "pinia";
import {
  readUserInfo,
  readSidebarStatus,
  updateSidebarStatus,
  updateUserInfo,
  deleteUserInfo,
  deleteSidebarStatus,
} from "@/utils/localStorage";
import { UserInfo, LoginData } from "@/types";
import { login } from "@/api/user";

interface AppStoreState {
  sidebarStatus: boolean;
  userInfo: UserInfo | null;
}

export const useAppStore = defineStore("app", {
  state(): AppStoreState {
    return {
      sidebarStatus: readSidebarStatus() !== "closed",
      userInfo: readUserInfo(),
    };
  },
  getters: {
    roles() {
      if (this.userInfo?.isAdmin) {
        return ["admin"];
      }
      return [];
    },
  },
  actions: {
    toggleCollapse() {
      this.sidebarStatus = !this.sidebarStatus;
      this.sidebarStatus ? updateSidebarStatus("opened") : updateSidebarStatus("closed");
    },
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
    },
    closeCollapse() {
      this.sidebarStatus = false;
      updateSidebarStatus("closed");
    },
    openCollapse() {
      this.sidebarStatus = true;
      updateSidebarStatus("opened");
    },
    login(loginInfo: LoginData) {
      const { email, password } = loginInfo;
      return new Promise((resolve, reject) => {
        login({ email, password })
          .then(({ data }) => {
            this.setUserInfo(data);
            updateUserInfo(data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    logout() {
      this.setUserInfo(null);
      deleteUserInfo();
      deleteSidebarStatus();
    },
  },
});
