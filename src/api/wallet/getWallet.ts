import { useApiCalls } from "@utils/hooks";

export const GetWallet = () => {
  const { data, isSuccess, isLoading } = useApiCalls<any, any>("wallet");

  return { data, isSuccess, isLoading };
};
