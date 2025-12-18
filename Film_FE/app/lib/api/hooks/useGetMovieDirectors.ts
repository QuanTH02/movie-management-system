'use client';

import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import useApi from '../useApi';

interface Director {
  director_id: number;
  director_name: string;
  [key: string]: unknown;
}

const useGetMovieDirectors = (movieId: string | null, options?: SWRConfiguration<Director[]>) => {
  const { fetcher } = useApi();

  return useSWR<Director[]>(
    movieId ? `/movie/${encodeURIComponent(movieId)}/director/` : null,
    async (url: string) => {
      const response = await fetcher(url);
      return Array.isArray(response) ? response : (response?.data || []);
    },
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetMovieDirectors;

