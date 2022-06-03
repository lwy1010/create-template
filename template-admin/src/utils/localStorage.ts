import { localStore } from "@7inch/storage";
import { UserInfo } from "@/types/user";
import { Language } from "@/enums";

const userInfo = "userInfo";
export const readUserInfo = () => localStore.get<UserInfo>(userInfo);
export const updateUserInfo = (info: UserInfo) => localStore.set(userInfo, info);
export const deleteUserInfo = () => localStore.remove(userInfo);

const sidebarStatus = "sidebarStatus";
export const readSidebarStatus = () => localStore.get(sidebarStatus);
export const updateSidebarStatus = (status: string) => localStore.set(sidebarStatus, status);
export const deleteSidebarStatus = () => localStore.remove(sidebarStatus);

const language = "language";
export const readLanguage = (): Language => localStore.get(language) || Language.zhCN;
export const updateLanguage = (lang: string) => localStore.set(language, lang);
export const deleteLanguage = () => localStore.remove(language);
