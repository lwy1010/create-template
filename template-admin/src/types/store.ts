import { UserInfo } from "@/types/user";

export interface RootState {
  app: AppState;
}

export interface AppState {
  sidebarStatus: boolean;
  token: string;
  userInfo: UserInfo;
}
