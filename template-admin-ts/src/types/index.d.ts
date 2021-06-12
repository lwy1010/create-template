export interface LoginData {
  username: string;
  password: string;
}

export interface MovieParams {
  kw: string;
  currentPage: number;
  pageSize: number;
}

/* store interface */
export interface UserInfo {
  name: string;
}

export interface AppState {
  sidebarStatus: boolean;
  token: string;
  userInfo: UserInfo;
}

interface IUser {
  id: string;
}
