import request from "@/configs/axios";

export function readMovies(params) {
  return request({
    url: "/movies",
    method: "get",
    params,
  });
}
