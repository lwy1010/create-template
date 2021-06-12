import request from '@/configs/axios';
import { MovieParams } from '@/types';

export function readMovies(params: MovieParams) {
  return request({
    url: '/movies',
    method: 'get',
    params,
  });
}
