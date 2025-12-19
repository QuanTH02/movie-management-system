"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { Movie } from "@/types/api.types";
import useApi from "../useApi";

const useGetLikedMovies = (
  userName: string | null,
  options?: SWRConfiguration<Movie[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Movie[]>(
    userName ? `/likemovie/?userName=${encodeURIComponent(userName)}` : null,
    async (url: string) => {
      const response = await fetcher(url);
      // Backend returns array directly
      if (Array.isArray(response)) {
        return response;
      }
      // Fallback: check for data field (for consistency with other APIs)
      if (response && typeof response === "object" && "data" in response) {
        return Array.isArray(response.data) ? response.data : [];
      }
      // Default: return empty array
      return [];
    },
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetLikedMovies;
