import request from "@/plugins/axios";
import { Params, MovieRecord } from "@/types/movie";

export function readMovies(params: Params) {
  return request<MovieRecord>({
    url: "/movie",
    method: "get",
    params,
  });
}
