import { useGetMe } from "@api";

export const useWallet = () => {
  const { data: userData, isLoading } = useGetMe();

  const balance = isLoading
    ? "-"
    : userData?.assetBalances.find(({ currency }) => currency === "USD")
        ?.balance ?? "0.00";

  return {
    userData,
    balance,
  };
};
