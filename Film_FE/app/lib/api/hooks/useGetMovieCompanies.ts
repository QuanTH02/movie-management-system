"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Company {
  productioncompanies_id: number;
  company_name?: string;
  productioncompanies_name?: string;
  [key: string]: unknown;
}

const useGetMovieCompanies = (
  movieName: string | null,
  options?: SWRConfiguration<Company[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Company[]>(
    movieName
      ? `/movie/${encodeURIComponent(movieName)}/productioncompanies/`
      : null,
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

export default useGetMovieCompanies;
