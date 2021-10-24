import { defineStore } from "pinia";
import {
  readUserInfo,
  readSidebarStatus,
  updateSidebarStatus,
  updateUserInfo,
  deleteUserInfo,
  deleteSidebarStatus,
} from "@/utils/localStorage";
import { UserInfo, LoginData } from "@/types/user";
import { login } from "@/api/user";

export const useAppStore = defineStore("app", {
  state() {
    return {
      sidebarStatus: readSidebarStatus() !== "closed",
      userInfo: readUserInfo(),
      token: "",
    };
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
      try {
        this.setUserInfo(null);
        deleteUserInfo();
        deleteSidebarStatus();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
