import { useMutationSideEffects } from "@/utils/hooks/useMutationSideEffects";
import { axiosMutation } from "@/utils/functions/axiosMutation";

export type PatchUser = {
  email: string | null;
  phone: string | null;
  country: string | null;
  name: string | null;
};

export const usePatchUser = () => {
  const { executeMutation, status } = useMutationSideEffects<any, PatchUser>({
    onExecuteMutation: async (data) => await axiosMutation("put", `user`, data),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation, status };
};
