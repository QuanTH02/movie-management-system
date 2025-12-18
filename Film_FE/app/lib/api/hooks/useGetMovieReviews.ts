"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useApi from "../useApi";

interface Review {
  film_review_id: number;
  name_review: string;
  title_review: string;
  content_review: string;
  star_review: number;
  date_review: string;
  like_count?: number;
  dislike_count?: number;
}

const useGetMovieReviews = (
  movieName: string | null,
  options?: SWRConfiguration<Review[]>,
) => {
  const { fetcher } = useApi();

  return useSWR<Review[]>(
    movieName ? `/movie/${encodeURIComponent(movieName)}/filmreview/` : null,
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

export default useGetMovieReviews;
