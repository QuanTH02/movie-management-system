"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Country {
  countryorigin_id: number;
  country_name?: string;
  country_origin_name?: string;
  [key: string]: unknown;
}

const useGetMovieCountry = (
  movieName: string | null,
  options?: SWRConfiguration<Country[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Country[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/countryorigin/` : null,
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

export default useGetMovieCountry;
