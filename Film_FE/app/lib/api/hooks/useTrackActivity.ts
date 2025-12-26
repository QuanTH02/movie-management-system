"use client";

import type { SWRMutationConfiguration } from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { TrackActivityRequest } from "@/types/api.types";
import useApi from "../useApi";

const useTrackActivity = (
  options?: SWRMutationConfiguration<void, Error, string, TrackActivityRequest>,
) => {
  const { fetcher } = useApi();

  return useSWRMutation(
    "/track-activity/",
    async (_: string, { arg }: { arg: TrackActivityRequest }) => {
      try {
        await fetcher("/users/track-activity/", {
          method: "POST",
          body: JSON.stringify(arg),
        });
        // Silent success - no return value needed
      } catch (error: any) {
        // Silent error handling - don't throw or show error to user
        console.warn("Failed to track activity:", error);
      }
    },
    {
      ...options,
    },
  );
};

export default useTrackActivity;
