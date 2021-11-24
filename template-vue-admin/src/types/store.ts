import { UserInfo } from "@/types";

export interface RootState {
  app: AppState;
}

export interface AppState {
  sidebarStatus: boolean;
  token: string;
  userInfo: UserInfo;
}
