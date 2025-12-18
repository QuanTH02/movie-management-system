"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface BoxOffice {
  budget?: string;
  gross?: string;
  opening_weekend?: string;
  gross_worldwide?: string;
}

const useGetMovieBoxOffice = (
  movieName: string | null,
  options?: SWRConfiguration<BoxOffice[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<BoxOffice[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/ticketroom/` : null,
    async (url: string) => {
      const response = await fetcher(url);
      if (Array.isArray(response)) return response;
      if (response?.data)
        return Array.isArray(response.data) ? response.data : [response.data];
      return [];
    },
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetMovieBoxOffice;
