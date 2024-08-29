import { useApiCalls } from "@/utils/hooks/useApiCalls";

export type GetWalletHistoryApi = {
  id: string;
  amount: number;
  transactionID: string;
  timestamp: Date;
  cashFlowType: string;
}[];

export const useGetWalletHistory = () => {
  const { data, isLoading, status } = useApiCalls<
    GetWalletHistoryApi,
    GetWalletHistoryApi
  >("wallet/history", {
    refetchOnMount: true,
  });

  return { data, isLoading, status };
};
