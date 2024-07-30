import { useRouter } from "next/navigation";
import { PostCancelOrder, useGetMe } from "@api";
import { useEffect, useState } from "react";

type FilterData = {
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
}[];

export const useDeals = (params: { type: string }) => {
  const router = useRouter();

  const { data: userData, isLoading, isSuccess } = useGetMe();
  const { executeMutation: postCancelOrder } = PostCancelOrder();

  const [popUp, setPopUp] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<FilterData | undefined>(
    undefined,
  );

  const handleChangeType = (type: "completed" | "open") => {
    router.replace(type);
  };

  const handlePopUp = (value: boolean, id?: string) => {
    setPopUp(value);

    if (id) {
      setOrderId(id);
    }
  };

  const handleCancelOrder = (data: string | null) => {
    postCancelOrder({ orderId: data });
  };

  useEffect(() => {
    if (params.type === "completed") {
      const filterData = userData?.orders
        .reverse()
        .filter(({ orderStatus }) => orderStatus === "COMPLETED");

      setFilteredData(filterData);
    } else if (params.type === "open") {
      const filterData = userData?.orders
        .reverse()
        .filter(({ orderStatus }) => orderStatus === "OPEN");

      setFilteredData(filterData);
    }
  }, [params.type, userData?.orders]);

  return {
    router,
    userData,
    isSuccess,
    isLoading,
    popUp,
    orderId,
    filteredData,
    handles: {
      handleChangeType,
      handleCancelOrder,
      handlePopUp,
    },
  };
};
