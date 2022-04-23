export interface FilterQuery {
  title?: { $regex: RegExp; $options: string };
  isHot?: boolean;
}

export interface ArticleQuery {
  page?: number;
  limit?: number;
  title?: string;
  isHot?: boolean;
}

export interface Article {
  title: string;
  authorId: string;
  content: string;
  collectCount: number;
  readCount: number;
  agreeCount: number;
  likeCount: number;
  isHot: boolean;
}
