import { useRouter } from "next/navigation";
import { useGetMe } from "@api";

export const useMainWrapper = () => {
  const { data: userData, isLoading, isSuccess } = useGetMe();

  const balance = userData?.assetBalances.find(
    ({ currency }) => currency === "USD",
  )?.balance;

  const router = useRouter();

  return {
    isLoading,
    isSuccess,
    router,
    balance,
    userData,
  };
};
