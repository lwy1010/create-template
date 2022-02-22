import { Paginate } from "./common";

export type PostPaginate = Paginate;

export interface Post {
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
