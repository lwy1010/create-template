import { defineStore } from "pinia";
import {
  readUserInfo,
  readSidebarStatus,
  updateSidebarStatus,
  updateUserInfo,
  deleteUserInfo,
  deleteSidebarStatus,
  readLanguage,
  updateLanguage,
} from "@/utils/localStorage";
import { UserInfo, LoginData } from "@/types/user";
import { login } from "@/api/user";
import { Language } from "@/enums";

interface AppStoreState {
  sidebarStatus: boolean;
  userInfo: UserInfo | null;
  currentLanguage: Language;
}

export const useAppStore = defineStore("app", {
  state(): AppStoreState {
    return {
      sidebarStatus: readSidebarStatus() !== "closed",
      userInfo: readUserInfo(),
      currentLanguage: readLanguage(),
    };
  },
  getters: {
    roles() {
      if (this.userInfo?.isAdmin) {
        return ["admin"];
      }
      return [];
    },
    isSidebarCollapse(): boolean {
      return !this.sidebarStatus;
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
    setCurrentLanguage(lang: Language) {
      this.currentLanguage = lang;
      updateLanguage(lang);
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
