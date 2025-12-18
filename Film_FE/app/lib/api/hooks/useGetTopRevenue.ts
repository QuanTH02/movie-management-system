'use client';

import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type { Movie } from '@/types/api.types';
import useApi from '../useApi';

interface TopRevenueResponse {
  data_top?: Movie[];
  data?: any[];
  message?: string;
}

const useGetTopRevenue = (options?: SWRConfiguration<TopRevenueResponse>) => {
  const { fetcher } = useApi();

  return useSWR<TopRevenueResponse>(
    '/ticketroom/',
    async (url: string) => {
      const data = await fetcher(url);
      // Handle both response formats: {data_top: [...]} or direct list
      if (Array.isArray(data)) {
        return { data_top: [] };
      }
      return data;
    },
    {
      revalidateOnFocus: false,
      ...options,
    },
  );
};

export default useGetTopRevenue;

