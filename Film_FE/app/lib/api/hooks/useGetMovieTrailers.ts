"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Trailer {
  link_trailer_id: number;
  link_trailer: string;
  [key: string]: unknown;
}

const useGetMovieTrailers = (
  movieId: string | null,
  options?: SWRConfiguration<Trailer[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Trailer[]>(
    movieId ? `/movie/${encodeURIComponent(movieId)}/linktrailer/` : null,
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

export default useGetMovieTrailers;
