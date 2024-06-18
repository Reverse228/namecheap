import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetUserData } from "@utils/hooks";
import { PostOrder, SendOrderProps, useGetMe } from "@api";

export const useTrade = () => {
  const [notFounds, setNotFounds] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { data: userData, isSuccess, isLoading } = useGetMe();
  const { executeMutation, data: postOrderData } = PostOrder();

  const router = useRouter();

  const handleAlertMessage = (value: string | null) => {
    setAlertMessage(value);
  };

  const handleNotFounds = (value: boolean) => {
    setNotFounds(value);
  };

  const handleTrade = (
    type: "BUY" | "SELL",
    pair: string,
    sum?: string | undefined,
  ) => {
    const balance = Number(
      userData?.assetBalances.find(({ currency }) => currency === "USDT")
        ?.balance ?? 0,
    );

    if (balance <= 0) {
      handleNotFounds(true);
    } else {
      const time = new Date();
      const sendDate: SendOrderProps = {
        pair: {
          baseCurrency: pair.split("-")[1] ?? "",
          quoteCurrency: pair.split("-")[0] ?? "",
        },
        amount: Number(sum) ?? 0,
        price: 0,
        orderType: type,
        orderCategory: "SPOT",
        margin: 0,
        orderStatus: "OPEN",
        timestamp: time,
      };

      executeMutation(sendDate);
    }
  };

  return {
    router,
    alertMessage,
    notFounds,
    isSuccess,
    isLoading,
    handles: {
      handleTrade,
      handleNotFounds,
      handleAlertMessage,
    },
  };
};
