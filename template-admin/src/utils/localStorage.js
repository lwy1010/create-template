import { localStore } from "@7inch/storage";

const userInfo = "userInfo";
export const readUserInfo = () => localStore.get(userInfo, true);
export const updateUserInfo = (info) => localStore.set(userInfo, info, true);
export const deleteUserInfo = () => localStore.remove(userInfo);

const sidebarStatus = "sidebarStatus";
export const readSidebarStatus = () => localStore.get(sidebarStatus, true);
export const updateSidebarStatus = (status) => localStore.set(sidebarStatus, status, true);
export const deleteSidebarStatus = () => localStore.remove(sidebarStatus);
