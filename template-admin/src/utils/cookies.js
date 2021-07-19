import Cookies from "js-cookie";

// token cookies
const token = "token";
export const readToken = () => Cookies.get(token);
export const updateToken = (tokenStr) => Cookies.set(token, tokenStr);
export const deleteToken = () => Cookies.remove(token);

// user cookies
const userInfo = "userInfo";
export const readUserInfo = () => Cookies.getJSON(userInfo);
export const updateUserInfo = (info) => Cookies.set(userInfo, info);
export const deleteUserInfo = () => Cookies.remove(userInfo);

// sidebar cookies
const sidebarStatus = "sidebarStatus";
export const readSidebarStatus = () => Cookies.getJSON(sidebarStatus);
export const updateSidebarStatus = (status) => Cookies.set(sidebarStatus, status);
export const deleteSidebarStatus = () => Cookies.remove(sidebarStatus);
