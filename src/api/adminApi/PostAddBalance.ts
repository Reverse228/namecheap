import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

export type PostAddBalanceApi = {
  userId: string;
  amount: number;
  currency: string | null;
};
export const usePostAddBalance = () => {
  const { executeMutation, data, status } = useMutationSideEffects<
    any,
    PostAddBalanceApi
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `user/add-balance`, data),
    refetchQueries: ["user/all"],
  });

  return { executeMutation, data, status };
};
