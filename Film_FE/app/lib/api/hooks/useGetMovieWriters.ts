'use client';

import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import useApi from '../useApi';

interface Writer {
  writers_id: number;
  name: string;
}

const useGetMovieWriters = (movieName: string | null, options?: SWRConfiguration<Writer[]>) => {
  const { fetcher } = useApi();

  return useSWR<Writer[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/writers/` : null,
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

export default useGetMovieWriters;

