import request from "@/plugins/axios";

export function readMovies(params) {
  return request({
    url: "/movie",
    method: "get",
    params,
  });
}
