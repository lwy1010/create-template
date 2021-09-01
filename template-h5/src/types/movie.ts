export interface Params {
  page: number;
  limit: number;
  name?: string;
}

export interface Cast {
  _id: string;
  name: string;
  avatar: string;
}

export interface Movie {
  _id: string;
  name: string;
  author: string;
  duration: string;
  poster: string;
  rate: number;
  summary: string;
  video: string;
  categories: Array<string>;
  casts: Array<Cast>;
}
