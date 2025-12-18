"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface DidYouKnow {
  didyouknow_id: number;
  name?: string;
  content?: string;
  trivia?: string;
  goofs?: string;
  quotes?: string;
  [key: string]: unknown;
}

const useGetMovieDidYouKnow = (
  movieName: string | null,
  options?: SWRConfiguration<DidYouKnow[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<DidYouKnow[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/didyouknow/` : null,
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

export default useGetMovieDidYouKnow;
