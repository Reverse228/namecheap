import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetUserData } from "@utils/hooks";
import {
  GetPairs,
  PostOrder,
  SendOrderProps,
  useGetMe,
  usePostCalculateProfitOrLose,
} from "@api";

export const useTrade = (pair: string) => {
  const [notFounds, setNotFounds] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<string | undefined>(undefined);
  const [sumOfInvesting, setSumOfInvesting] = useState<number>(0);

  const { data: userData, isSuccess, isLoading } = useGetMe();
  const { executeMutation, data: postOrderData } = PostOrder();
  const { executeMutation: calculateProfit, data } =
    usePostCalculateProfitOrLose();
  const { data: pairsData } = GetPairs();

  const router = useRouter();

  const handleAlertMessage = (value: string | null) => {
    setAlertMessage(value);
  };

  const handleNotFounds = (value: boolean) => {
    setNotFounds(value);
  };

  const handleSumOfInvesting = (value: number) => {
    setSumOfInvesting(value);
  };

  const handleTrade = (
    type: "BUY" | "SELL",
    pair: string,
    sum?: string | undefined,
  ) => {
    const balance = Number(
      userData?.assetBalances.find(({ currency }) => currency === "USD")
        ?.balance ?? 0,
    );

    if (balance <= 0) {
      handleNotFounds(true);
    } else {
      const lastPrice = pairsData?.find(
        ({ baseCurrency, quoteCurrency }) =>
          quoteCurrency === pair.split("-")[0] &&
          baseCurrency === pair.split("-")[1],
      )?.lastPrice;

      const pairFilter = "";

      const sendDate: SendOrderProps = {
        pair: `${pair.split("-")[1]}-${pair.split("-")[0]}`,
        amount: Number(sum),
        orderType: type,
        price: lastPrice ?? 0,
        margin: 1,
        orderCategory: "SPOT",
      };

      executeMutation(sendDate);
    }
  };

  //TODO: finish calculateOfProfit
  // useEffect(() => {
  //   if (sumOfInvesting > 0) {
  //     const data = {
  //       pair: `${pair.split("-")[0]}/${pair.split("-")[1]}`,
  //       amount: sumOfInvesting,
  //     };
  //
  //     calculateProfit(data);
  //   }
  // }, [sumOfInvesting]);

  useEffect(() => {
    if (pairsData) {
      const graphPair = pairsData?.find(
        ({ baseCurrency, quoteCurrency }) =>
          quoteCurrency === pair.split("-")[0] &&
          baseCurrency === pair.split("-")[1],
      );

      const typeOfPair = graphPair?.type;

      if (typeOfPair === "index") {
        setGraphData(graphPair?.baseCurrency);
      } else {
        setGraphData(`${graphPair?.baseCurrency}${graphPair?.quoteCurrency}`);
      }
    }
  }, []);

  return {
    router,
    alertMessage,
    notFounds,
    isSuccess,
    isLoading,
    graphData,
    handles: {
      handleTrade,
      handleNotFounds,
      handleAlertMessage,
      handleSumOfInvesting,
    },
  };
};
