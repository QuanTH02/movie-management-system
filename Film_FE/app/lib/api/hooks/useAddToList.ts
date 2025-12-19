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
      try {
        const response = await fetcher("/likemovie/", {
          method: "POST",
          body: JSON.stringify(arg),
        });
        // Response can be null (204) or have a message
        return response;
      } catch (error: any) {
        // Check if it's a "already liked" error (400) - treat as success
        if (error.message && error.message.includes("already liked")) {
          return { message: error.message };
        }
        throw error;
      }
    },
    {
      ...options,
    },
  );
};

export default useAddToList;
