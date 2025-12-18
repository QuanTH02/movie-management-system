'use client';

import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type { Movie } from '@/types/api.types';
import useApi from '../useApi';

const useGetAllMovies = (options?: SWRConfiguration<Movie[]>) => {
  const { fetcher } = useApi();

  return useSWR<Movie[]>(
    '/film/',
    async (url: string) => {
      try {
        const response = await fetcher(url);
        const movies = Array.isArray(response) ? response : (response?.data || []);
        return movies;
      } catch (error) {
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      ...options,
    },
  );
};

export default useGetAllMovies;

