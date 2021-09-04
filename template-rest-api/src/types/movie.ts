export interface Cast {
  name: string;
  avatar: string;
}

export interface Movie {
  name: string;
  author: string;
  duration: string;
  poster: string | undefined;
  rate: number;
  summary: string | undefined;
  video?: string;
  categories: Array<string>;
  casts: Array<Cast>;
  cover?: string;
  pubdate?: string;
}
