"use client";

import type { SWRMutationConfiguration } from "swr/mutation";
import useSWRMutation from "swr/mutation";
import type { LoginRequest, LoginResponse } from "@/types/api.types";
import useApi from "../useApi";

const useLogin = (
  options?: SWRMutationConfiguration<
    LoginResponse,
    Error,
    string,
    LoginRequest
  >,
) => {
  const { fetcher } = useApi();

  return useSWRMutation(
    "/login/",
    async (_: string, { arg }: { arg: LoginRequest }) =>
      fetcher("/login/", {
        method: "POST",
        body: JSON.stringify(arg),
      }) as Promise<LoginResponse>,
    {
      ...options,
    },
  );
};

export default useLogin;
