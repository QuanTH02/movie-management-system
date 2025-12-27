"use client";

import useSWRMutation from "swr/mutation";
import type { Movie } from "@/types/api.types";
import useApi from "../useApi";

interface NaturalSearchRequest {
  query: string;
  page?: number;
  page_size?: number;
}

interface NaturalSearchPagination {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

interface NaturalSearchResponse {
  message: string;
  data: Movie[];
  pagination?: NaturalSearchPagination;
}

const useNaturalLanguageSearch = () => {
  const { fetcher } = useApi();

  return useSWRMutation<
    NaturalSearchResponse,
    Error,
    string,
    NaturalSearchRequest
  >(
    "/film/search/natural/",
    async (url: string, { arg }: { arg: NaturalSearchRequest }) => {
      try {
        const response = await fetcher(url, {
          method: "POST",
          body: JSON.stringify(arg),
        });
        return response as NaturalSearchResponse;
      } catch (error) {
        throw error;
      }
    },
  );
};

export default useNaturalLanguageSearch;
