"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { Movie } from "@/types/api.types";
import useApi from "../useApi";

const useGetMovieDetail = (
  movieId: string,
  options?: SWRConfiguration<Movie>,
) => {
  const { fetcher } = useApi();

  return useSWR<Movie>(`/movie/${movieId}/`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    ...options,
  });
};

export default useGetMovieDetail;
