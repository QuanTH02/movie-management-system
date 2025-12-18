"use client";

import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import type { User } from "@/types/api.types";
import useApi from "../useApi";

interface GetAccountRequest {
  currentAccount: string;
}

interface GetAccountResponse {
  data: User[];
}

const useGetAccount = (
  currentAccount: string | null,
  options?: SWRConfiguration<GetAccountResponse>,
) => {
  const { fetcher } = useApi();

  return useSWR<GetAccountResponse>(
    currentAccount ? ["/account/", currentAccount] : null,
    async ([url, account]: [string, string]) =>
      fetcher(url, {
        method: "POST",
        body: JSON.stringify({ currentAccount: account }),
      }) as Promise<GetAccountResponse>,
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetAccount;
