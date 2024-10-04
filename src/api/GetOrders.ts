import { useApiCalls } from "@/utils/hooks/useApiCalls";

export type OrdersApi = {
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

export const useGetOrders = (id: string | undefined) => {
  const { data, isSuccess, isLoading, status } = useApiCalls<
    OrdersApi[],
    OrdersApi[]
  >(
    "orders",
    {
      enabled: Boolean(id),
      retry: Boolean(id),
      refetchOnMount: true,
      retryOnMount: true,
    },
    {
      userId: id,
    },
  );

  return { data, isSuccess, isLoading, status };
};
