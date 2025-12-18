"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { Movie } from "@/types/api.types";
import useApi from "../useApi";

const useGetRecommendContentBased = (
  movieId: string | null,
  options?: SWRConfiguration<Movie[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Movie[]>(
    movieId ? `/recommend/contentbased/${encodeURIComponent(movieId)}/` : null,
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

export default useGetRecommendContentBased;
