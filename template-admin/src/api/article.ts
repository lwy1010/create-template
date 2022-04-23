import request from "@/utils/request";
import { ArticlePaginate, Article } from "@/types/article";
import { PaginateRecord } from "@/types/common";

export function queryArticles(params: ArticlePaginate) {
  return request<PaginateRecord<Article>>({
    url: "/article",
    method: "get",
    params,
  });
}

export function deleteArticle(id: string) {
  return request({
    url: `/article/${id}`,
    method: "delete",
  });
}
