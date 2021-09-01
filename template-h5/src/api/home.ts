import request from "@/plugins/axios";
import { Params } from "@/types/movie";

export function readMovies(params: Params) {
  return request({
    url: "/movie",
    method: "get",
    params,
  });
}
