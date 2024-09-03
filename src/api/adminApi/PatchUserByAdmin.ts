import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

export type PatchUserByAdmin = {
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

export const usePatchUserByAdmin = () => {
  const { executeMutation, status } = useMutationSideEffects<
    any,
    PatchUserByAdmin
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("put", `user/edit_user_by_admin`, data),
    refetchQueries: ["user/all"],
  });

  return { executeMutation, status };
};
