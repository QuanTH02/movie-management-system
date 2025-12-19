"use client";

import useSWRMutation from "swr/mutation";
import type { SWRMutationConfiguration } from "swr/mutation";
import useApi from "../useApi";
import type { LikeMovieRequest } from "@/types/api.types";

const useDeleteLikedMovie = (
  options?: SWRMutationConfiguration<void, Error, string, LikeMovieRequest>,
) => {
  const { fetcher } = useApi();

  return useSWRMutation<void, Error, string, LikeMovieRequest>(
    "/likemovie/",
    async (_: string, { arg }: { arg: LikeMovieRequest }) => {
      await fetcher("/likemovie/", {
        method: "DELETE",
        body: JSON.stringify(arg),
      });
    },
    options,
  );
};

export default useDeleteLikedMovie;
