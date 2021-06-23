import { UserInfo } from "@/types";
import Cookies from "js-cookie";

// token cookies
const token = "token";
export const readToken = () => Cookies.get(token);
export const updateToken = (tokenStr: string) => Cookies.set(token, tokenStr);
export const deleteToken = () => Cookies.remove(token);

// user cookies
const userInfo = "userInfo";
export const readUserInfo = () => Cookies.getJSON(userInfo);
export const updateUserInfo = (info: UserInfo) => Cookies.set(userInfo, info);
export const deleteUserInfo = () => Cookies.remove(userInfo);

// sidebar cookies
const sidebarStatus = "sidebarStatus";
export const readSidebarStatus = () => Cookies.getJSON(sidebarStatus);
export const updateSidebarStatus = (status: string) => Cookies.set(sidebarStatus, status);
export const deleteSidebarStatus = () => Cookies.remove(sidebarStatus);
