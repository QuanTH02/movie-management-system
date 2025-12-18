"use client";

import type { SWRMutationConfiguration } from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { LikeMovieRequest } from "@/types/api.types";
import useApi from "../useApi";

const useAddToList = (
  options?: SWRMutationConfiguration<void, Error, string, LikeMovieRequest>,
) => {
  const { fetcher } = useApi();

  return useSWRMutation(
    "/likemovie/",
    async (_: string, { arg }: { arg: LikeMovieRequest }) => {
      await fetcher("/likemovie/", {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
    {
      ...options,
    },
  );
};

export default useAddToList;
