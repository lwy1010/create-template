import { login } from "@/api/user";
import { RootState, AppState } from "@/types/store";
import { UserInfo, LoginData } from "@/types/user";
import {
  readUserInfo,
  updateUserInfo,
  deleteUserInfo,
  readSidebarStatus,
  updateSidebarStatus,
  deleteSidebarStatus,
} from "@/utils/localStorage";

import { MutationTree, ActionTree, Module } from "vuex";

const state: AppState = {
  sidebarStatus: readSidebarStatus() !== "closed",
  userInfo: readUserInfo(),
  token: "",
};

const mutations: MutationTree<AppState> = {
  toggleCollapse(state) {
    state.sidebarStatus = !state.sidebarStatus;
    state.sidebarStatus ? updateSidebarStatus("opened") : updateSidebarStatus("closed");
  },

  setUserInfo(state, userInfo: UserInfo) {
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

const actions: ActionTree<AppState, RootState> = {
  login({ commit }, loginInfo: LoginData) {
    const { email, password } = loginInfo;
    return new Promise((resolve, reject) => {
      login({ email, password })
        .then(({ data }) => {
          commit("setUserInfo", data);
          updateUserInfo(data);
          resolve(data);
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
} as Module<AppState, RootState>;
