"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Language {
  language_id: number;
  language_name: string;
  [key: string]: unknown;
}

const useGetMovieLanguage = (
  movieName: string | null,
  options?: SWRConfiguration<Language[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Language[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/language/` : null,
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

export default useGetMovieLanguage;
