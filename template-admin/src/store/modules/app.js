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

const state = {
  sidebarStatus: readSidebarStatus() !== "closed",
  token: readToken() || "",
  userInfo: readUserInfo(),
};

const mutations = {
  toggleCollapse(state) {
    state.sidebarStatus = !state.sidebarStatus;
    state.sidebarStatus ? updateSidebarStatus("opened") : updateSidebarStatus("closed");
  },

  setToken(state, token) {
    state.token = token;
  },

  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },

  closeCollapse(state) {
    state.sidebarStatus = false;
    updateSidebarStatus("closed");
  },

  openCollapse(state) {
    state.sidebarStatus = true;
    updateSidebarStatus("opened");
  },
};

const actions = {
  login({ commit }, loginInfo) {
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

  logout({ commit }) {
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
