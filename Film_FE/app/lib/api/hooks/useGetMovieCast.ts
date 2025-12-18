"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Cast {
  cast_id: number;
  name: string;
  character_name?: string;
  role?: string;
  [key: string]: unknown;
}

const useGetMovieCast = (
  movieName: string | null,
  options?: SWRConfiguration<Cast[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Cast[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/cast/` : null,
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

export default useGetMovieCast;
