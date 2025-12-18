'use client';

import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import useApi from '../useApi';

interface Location {
  filminglocations_id: number;
  location_name?: string;
  filminglocations_name?: string;
  [key: string]: unknown;
}

const useGetMovieLocations = (movieName: string | null, options?: SWRConfiguration<Location[]>) => {
  const { fetcher } = useApi();

  return useSWR<Location[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/filminglocations/` : null,
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

export default useGetMovieLocations;

