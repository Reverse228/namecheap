import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation } from "@functions";
import { AxiosError } from "axios";

export const LogInUser = () => {
  const { executeMutation, isSuccess, data, isLoading, status, error } =
    useMutationSideEffects<
      { accessToken: string },
      { email: string; password: string }
    >({
      onExecuteMutation: async (data) =>
        await axiosMutation("post", `auth/login`, data, undefined, true),
      refetchQueries: ["auth/me"],
      options: {
        onError: (data) => {},
      },
    });

  return {
    executeMutation,
    isSuccess,
    data,
    isLoading,
    status,
    error: error as AxiosError<any>,
  };
};
