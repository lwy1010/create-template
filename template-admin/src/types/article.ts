import { Paginate } from "./common";

export type ArticlePaginate = Paginate;

export interface QueryForm {
  title?: string;
  isHot?: boolean;
}

export interface Article {
  agreeCount: number;
  authorId: string;
  collectCount: number;
  content: string;
  id: string;
  isHot: false;
  likeCount: number;
  readCount: number;
  title: string;
}
