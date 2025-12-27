"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { Movie } from "@/types/api.types";
import useApi from "../useApi";

interface PaginationInfo {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

interface MoviesResponse {
  message: string;
  data: Movie[];
  pagination?: PaginationInfo;
}

const useGetAllMovies = (
  page: number = 1,
  pageSize: number = 50,
  options?: SWRConfiguration<MoviesResponse>,
) => {
  const { fetcher } = useApi();

  const url = `/film/?page=${page}&page_size=${pageSize}`;

  return useSWR<MoviesResponse>(
    url,
    async (url: string) => {
      try {
        const response = await fetcher(url);
        return response as MoviesResponse;
      } catch (error) {
        throw error;
      }
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

export default useGetAllMovies;
