import { login, logout } from "@/api/user";
import {
  readToken,
  updateToken,
  deleteToken,
  readUserInfo,
  updateUserInfo,
  deleteUserInfo,
  readSidebarStatus,
  updateSidebarStatus,
  deleteSidebarStatus,
} from "@/utils/cookies";
import { Commit } from "vuex";
import { UserInfo, AppState, LoginData } from "@/types";

const state: AppState = {
  sidebarStatus: readSidebarStatus() !== "closed",
  token: readToken() || "",
  userInfo: readUserInfo(),
};

const mutations = {
  toggleCollapse(state: AppState) {
    state.sidebarStatus = !state.sidebarStatus;
    state.sidebarStatus ? updateSidebarStatus("opened") : updateSidebarStatus("closed");
  },

  setToken(state: AppState, token: string) {
    state.token = token;
  },

  setUserInfo(state: AppState, userInfo: UserInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  login({ commit }: { commit: Commit }, loginInfo: LoginData): Promise<void> {
    const { username, password } = loginInfo;
    return new Promise((resolve, reject) => {
      login({ username, password })
        .then(({ data }) => {
          commit("setToken", data.token);
          commit("setUserInfo", data.userInfo);
          updateToken(data.token);
          updateUserInfo(data.userInfo);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  logout({ commit }: { commit: Commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("setToken", "");
          commit("setUserInfo", null);
          deleteToken();
          deleteUserInfo();
          deleteSidebarStatus();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
