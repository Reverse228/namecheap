import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation, setToken } from "@functions";

export const LogInUser = () => {
  const { executeMutation, isSuccess, data } = useMutationSideEffects<
    { accessToken: string },
    { email: string; password: string }
  >({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `auth/login`, data, undefined, true),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation, isSuccess, data };
};
