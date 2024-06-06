import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetUserData } from "@utils/hooks";
import { PostOrder, SendOrderProps } from "@api";

export const useTrade = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [notFounds, setNotFounds] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { userData, handleTrigger } = useGetUserData();

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
    if (typeof userData === "object") {
      if (
        Number(
          userData?.assetBalances.find(({ assetName }) => assetName === "USDT")
            ?.balance,
        ) < 0
      ) {
        setNotFounds(true);
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

        PostOrder(sendDate)
          .then((value) => {
            handleTrigger();

            if (typeof value === "string") {
              const getError = value.split('"')[1];
              setAlertMessage(getError);
            }
            console.log(value);
          })
          .catch((e) => {});
      }
    }
  };

  useEffect(() => {
    setIsLoadingPage(true);
  }, []);

  return {
    router,
    alertMessage,
    userData,
    isLoadingPage,
    notFounds,
    handles: {
      handleTrade,
      handleNotFounds,
      handleAlertMessage,
    },
  };
};
