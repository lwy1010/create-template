import request from "@/utils/request";
import { LoginData } from "@/types/user";

export function login(data: LoginData) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
