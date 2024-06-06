import { useGetUserData } from "@utils/hooks";

export const useWallet = () => {
  const { userData } = useGetUserData();

  return { userData };
};
