"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface MovieImage {
  link_img_id: number;
  link_img: string;
  [key: string]: unknown;
}

const useGetMovieImages = (
  movieName: string | null,
  options?: SWRConfiguration<MovieImage[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<MovieImage[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/linkimg/` : null,
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

export default useGetMovieImages;
