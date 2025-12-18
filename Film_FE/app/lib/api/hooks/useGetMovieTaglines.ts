"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Tagline {
  taglines_id: number;
  tagline?: string;
  taglines_content?: string;
  [key: string]: unknown;
}

const useGetMovieTaglines = (
  movieName: string | null,
  options?: SWRConfiguration<Tagline[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Tagline[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/taglines/` : null,
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

export default useGetMovieTaglines;
