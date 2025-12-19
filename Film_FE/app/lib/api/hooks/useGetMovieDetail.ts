"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { Movie, MovieDetailResponse } from "@/types/api.types";
import useApi from "../useApi";

const useGetMovieDetail = (
  movieName: string | null,
  options?: SWRConfiguration<MovieDetailResponse>,
) => {
  const { fetcher } = useApi();

  return useSWR<MovieDetailResponse>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/` : null,
    async (url: string) => {
      const response = await fetcher(url);
      // Handle different response structures
      // Backend may return { message: "Successfully", data: [...] } or direct array
      if (response.data) {
        return response as MovieDetailResponse;
      }
      if (Array.isArray(response)) {
        return { message: "Successfully", data: response };
      }
      // If response is a single movie object
      if ((response as any).movie_name) {
        return { message: "Successfully", data: [response as Movie] };
      }
      return response as MovieDetailResponse;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      ...options,
    },
  );
};

export default useGetMovieDetail;
