import { useApiCalls } from "@utils/hooks";

type GetPositions = {
  amount: number;
  entryPrice: number;
  exitPrice: number;
  id: string;
  status: string;
  timestamp: string;
  order: {
    amount: number;
    id: string;
    margin: number;
    orderCategory: string;
    orderStatus: string;
    orderType: string;
    price: number;
    timestamp: string;
    activePair: {
      baseCurrency: string;
      lastPrice: number;
      quoteCurrency: string;
      type: string;
    };
  };
};

export const useGetPositions = () => {
  const { data, isLoading } = useApiCalls<any, GetPositions[]>("positions");

  return { data, isLoading };
};
