import Cookies from "js-cookie";

// user
const userInfo = "userInfo";
export const readUserInfo = () => Cookies.getJSON(userInfo);
export const updateUserInfo = (info) => Cookies.set(userInfo, info);
export const deleteUserInfo = () => Cookies.remove(userInfo);

// sidebar cookies
const sidebarStatus = "sidebarStatus";
export const readSidebarStatus = () => Cookies.getJSON(sidebarStatus);
export const updateSidebarStatus = (status) => Cookies.set(sidebarStatus, status);
export const deleteSidebarStatus = () => Cookies.remove(sidebarStatus);
