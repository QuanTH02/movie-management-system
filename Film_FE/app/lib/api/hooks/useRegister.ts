"use client";

import type { SWRMutationConfiguration } from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { RegisterRequest, RegisterResponse } from "@/types/api.types";
import useApi from "../useApi";

const useRegister = (
  options?: SWRMutationConfiguration<
    RegisterResponse,
    Error,
    string,
    RegisterRequest
  >,
) => {
  const { fetcher } = useApi();

  return useSWRMutation(
    "/register/",
    async (_: string, { arg }: { arg: RegisterRequest }) =>
      fetcher("/register/", {
        method: "POST",
        body: JSON.stringify(arg),
      }) as Promise<RegisterResponse>,
    {
      ...options,
    },
  );
};

export default useRegister;
