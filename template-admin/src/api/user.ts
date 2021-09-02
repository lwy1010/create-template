import request from "@/plugins/axios";
import { LoginData } from "@/types/user";

export function login(data: LoginData) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
