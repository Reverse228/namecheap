import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

export type PostPairsApi = {
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  lastPrice: number;
};

export const usePostPairs = () => {
  const { executeMutation, data, status } = useMutationSideEffects<
    any,
    PostPairsApi
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `pairs`, data),
    refetchQueries: ["pairs"],
  });

  return { executeMutation, data, status };
};
