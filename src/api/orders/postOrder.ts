import { useMutationSideEffects } from "@utils/hooks";
import { axiosMutation } from "@functions";

export type SendOrderProps = {
  pair: string;
  amount: number;
  price: number;
  orderType:
    | "BUY"
    | "SELL"
    | "BUY_LIMIT"
    | "SELL_LIMIT"
    | "BUY_STOP"
    | "SELL_STOP";
  orderCategory: "MARGIN" | "SPOT" | "FUTURES" | "OPTIONS";
  margin: number;
};

export const PostOrder = () => {
  const { executeMutation, data } = useMutationSideEffects<any, SendOrderProps>(
    {
      onExecuteMutation: async (data) =>
        await axiosMutation("post", `orders`, data),
      refetchQueries: ["auth/me"],
    },
  );

  return { executeMutation, data };
};
