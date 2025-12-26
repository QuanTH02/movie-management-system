"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

export interface RatingFilm {
  rating_id: number;
  number_of_stars?: string;
  percent_people_vote?: string;
  number_people_vote?: string;
  [key: string]: unknown;
}

interface RatingResponse {
  message: string;
  data: RatingFilm[];
}

const useGetMovieRating = (
  movieName: string | null,
  options?: SWRConfiguration<RatingFilm[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<RatingFilm[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/ratingfilm/` : null,
    async (url: string) => {
      const response = (await fetcher(url)) as RatingResponse;
      return response?.data || [];
    },
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetMovieRating;
