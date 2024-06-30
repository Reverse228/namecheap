import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation } from "@functions";

export const usePostCalculateProfitOrLose = () => {
  const { executeMutation, data } = useMutationSideEffects<any, any>({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `orders/calculateProfitOrLose`, data),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation, data };
};
