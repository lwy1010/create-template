import request from "@/configs/axios";
import { LoginData } from "@/types";

export function login(data: LoginData) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}
