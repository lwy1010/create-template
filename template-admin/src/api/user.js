import request from "@/configs/axios";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
