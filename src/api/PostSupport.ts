import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

type PostSupport = {
  name: string;
  email: string;
  number: string;
  time: string;
  topic: string;
  description: string;
};

export const usePostSupport = () => {
  const { executeMutation, data, status } = useMutationSideEffects<
    any,
    PostSupport
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `wallet/support`, data),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation, data, status };
};
