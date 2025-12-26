"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { Movie } from "@/types/api.types";
import useApi from "../useApi";

const useGetRecommendRealtime = (
  userId: string | null,
  options?: SWRConfiguration<Movie[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Movie[]>(
    userId ? `/recommend/realtime/${encodeURIComponent(userId)}/` : null,
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

export default useGetRecommendRealtime;
