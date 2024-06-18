import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation } from "@functions";

export type PostCancelOrder = {
  orderId: string | null;
};

export const PostCancelOrder = () => {
  const { executeMutation } = useMutationSideEffects<any, PostCancelOrder>({
    onExecuteMutation: async (data) =>
      await axiosMutation("post", `orders/cancel?orderId=${data.orderId}`),
    refetchQueries: ["auth/me"],
  });

  return { executeMutation };
};
