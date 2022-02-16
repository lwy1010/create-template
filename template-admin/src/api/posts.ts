import request from "@/utils/request";
import { PostPaginate, Post } from "@/types/posts";
import { PaginateRecord } from "@/types/common";

export function queryPosts(data: PostPaginate) {
  return request<PaginateRecord<Post>>({
    url: "/post/query",
    method: "post",
    data,
  });
}
