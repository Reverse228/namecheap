import { useApiCalls } from "@/utils/hooks/useApiCalls";

export type GetOrderItemApi = {
  id: string | null;
  activePair: {
    baseCurrency: string | null;
    lastPrice: number | null;
    type: string;
    quoteCurrency: string | null;
  };
  amount: number | null;
  price: number | null;
  orderType:
    | "BUY"
    | "SELL"
    | "BUY_LIMIT"
    | "SELL_LIMIT"
    | "BUY_STOP"
    | "SELL_STOP";
  orderCategory: "OPTIONS" | "MARGIN" | "SPOT" | "FUTURES";
  margin: number | null;
  orderStatus: string | null;
  timestamp: string | null;
};

export const useGetOrderItem = (id: string) => {
  const { data, isSuccess, isLoading, status } = useApiCalls<
    GetOrderItemApi,
    GetOrderItemApi
  >(`orders/${id}`, {
    refetchOnMount: true,
  });

  return { data, isSuccess, isLoading, status };
};
