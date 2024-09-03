import { useApiCalls } from "@/utils/hooks/useApiCalls";

export type GetAllUserApi = {
  id: string;
  email: string | null;
  accountStatus: string;
  phone: string | null;
  country: string | null;
  name: string | null;
  role: string | null;
  assetBalances: [
    {
      id: string;
      currency: string | null;
      balance: number | null;
      frozenBalance: number | null;
      activePair: any | null;
      walletAddress: string | null;
    },
  ];
  depositWallet: string | null;
}[];

export const useGetAllUsers = () => {
  const { data, isSuccess, isLoading, status } = useApiCalls<
    GetAllUserApi,
    GetAllUserApi
  >("user/all", {
    refetchOnMount: true,
  });

  return { data, isSuccess, isLoading, status };
};
