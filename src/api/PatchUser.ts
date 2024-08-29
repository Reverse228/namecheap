import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

export type PatchUser = {
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
};

export const usePatchUser = () => {
  const { executeMutation, status } = useMutationSideEffects<any, PatchUser>({
    onExecuteMutation: async (data) => await axiosMutation("patch", `user`),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation, status };
};
