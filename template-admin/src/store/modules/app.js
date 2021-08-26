import { login } from "@/api/user";
import {
  readUserInfo,
  updateUserInfo,
  deleteUserInfo,
  readSidebarStatus,
  updateSidebarStatus,
  deleteSidebarStatus,
} from "@/utils/localStorage";

const state = {
  sidebarStatus: readSidebarStatus() !== "closed",
  userInfo: readUserInfo(),
};

const mutations = {
  toggleCollapse(state) {
    state.sidebarStatus = !state.sidebarStatus;
    state.sidebarStatus ? updateSidebarStatus("opened") : updateSidebarStatus("closed");
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
    const { email, password } = loginInfo;
    return new Promise((resolve, reject) => {
      login({ email, password })
        .then(({ data }) => {
          commit("setUserInfo", data);
          updateUserInfo(data);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  logout({ commit }) {
    try {
      commit("setUserInfo", null);
      deleteUserInfo();
      deleteSidebarStatus();
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
