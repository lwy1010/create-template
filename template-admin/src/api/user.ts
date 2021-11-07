import request from "@/utils/request";
import { LoginData } from "@/types";

export function login(data: LoginData) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
