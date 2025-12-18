"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Genre {
  genres_id: number;
  genres_name: string;
  [key: string]: unknown;
}

const useGetMovieGenres = (
  movieId: string | null,
  options?: SWRConfiguration<Genre[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Genre[]>(
    movieId ? `/movie/${encodeURIComponent(movieId)}/genres/` : null,
    async (url: string) => {
      const response = await fetcher(url);
      return Array.isArray(response) ? response : response?.data || [];
    },
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetMovieGenres;
