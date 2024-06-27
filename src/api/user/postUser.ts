import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation } from "@functions";

export const PostUser = () => {
  const { executeMutation, isSuccess, data } = useMutationSideEffects<
    any,
    {
      email: string;
      password: string;
      phone: string;
      country: string;
      name: string;
    }
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `auth/register`, data),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation, isSuccess, data };
};
