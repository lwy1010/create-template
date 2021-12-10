export interface LoginData {
  email: string;
  password: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  isAdmin: boolean;
  token: string;
  avatar?: string;
}
