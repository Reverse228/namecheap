import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

export type DeletePairsApi = {
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  lastPrice: number;
};

export const useDeletePairs = () => {
  const { executeMutation, data, status } = useMutationSideEffects<
    any,
    DeletePairsApi
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("delete", `pairs`, data),
    refetchQueries: ["pairs"],
  });

  return { executeMutation, data, status };
};
