import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation } from "@functions";
import { MeUserApi } from "@src/api/user/meUser";

export const useAddBalance = () => {
  const { executeMutation } = useMutationSideEffects<
    any,
    { user: MeUserApi; amount: number }
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", "user/add-balance", data),

    refetchQueries: ["auth/me"],
  });

  return { executeMutation };
};
