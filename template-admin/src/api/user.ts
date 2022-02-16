import request from "@/utils/request";
import { LoginData, UserInfo } from "@/types/user";

export function login(data: LoginData) {
  return request<UserInfo>({
    url: "/user/login",
    method: "post",
    data,
  });
}
