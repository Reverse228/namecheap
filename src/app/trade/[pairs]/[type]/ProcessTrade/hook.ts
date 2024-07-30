import { useCallback, useEffect, useState } from "react";
import {
  GetPairs,
  PostOrder,
  SendOrderProps,
  useGetMe,
  usePostCalculateProfitOrLose,
} from "@api";
import { useRouter } from "next/navigation";

export const useProcessTrade = (pair: string, typeOfDeal: string) => {
  const [notFounds, setNotFounds] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [secondCurrency, setSecondCurrency] = useState<string | null>(null);
  const [sumOfInvesting, setSumOfInvesting] = useState<number>(0);
  const [typeOfTrade, setTypeOfTrade] = useState<string | null>(null);
  const [lastPriceOfPair, setLastPriceOfPair] = useState<number | undefined>(
    undefined,
  );

  const [alertAboutCompleteTransaction, setAlertAboutCompleteTransaction] =
    useState<boolean | null>(false);

  const { data: userData, isSuccess, isLoading } = useGetMe();
  const { executeMutation, data: postOrderData } = PostOrder();
  const { executeMutation: calculateProfit, data: profitData } =
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

  const handleAlertAboutCompleteTransaction = (value: boolean | null) => {
    setAlertAboutCompleteTransaction(value);
  };

  const handleTrade = (
    type: "BUY" | "SELL",
    pair: string,
    sum?: string | undefined,
    priceBuy?: number,
  ) => {
    const baseBalance = Number(
      userData?.assetBalances.find(({ currency }) => currency === "USD")
        ?.balance ?? 0,
    );

    const secondBalance = Number(
      userData?.assetBalances.find(
        ({ currency }) => currency === pair.split("-")[1],
      )?.balance ?? 0,
    );

    if (
      baseBalance <= 0 ||
      (type === "BUY" && baseBalance < Number(sum)) ||
      (type === "SELL" && secondBalance < Number(sum))
    ) {
      handleNotFounds(true);
    } else {
      const lastPrice = pairsData?.find(
        ({ baseCurrency, quoteCurrency }) =>
          quoteCurrency === pair.split("-")[0] &&
          baseCurrency === pair.split("-")[1],
      )?.lastPrice;

      const priceOfOrder =
        typeOfDeal === "market-transaction"
          ? lastPrice
          : typeOfDeal === "pending-transaction" && priceBuy;

      const typeOrder =
        typeOfDeal === "market-transaction"
          ? type
          : typeOfDeal === "pending-transaction" && `${type}_LIMIT`;

      const sendDate: SendOrderProps = {
        pair: `${pair.split("-")[1]}-${pair.split("-")[0]}`,
        amount: Number(sum),
        orderType: (typeOrder as SendOrderProps["orderType"]) || "BUY",
        price: priceOfOrder || 0,
        margin: 1,
        orderCategory: "SPOT",
      };

      executeMutation(sendDate);

      setTypeOfTrade(type);
    }
  };

  const handleNotFoundsMemoized = useCallback(
    () => handleNotFounds(false),
    [handleNotFounds],
  );

  const routerPushWallet = useCallback(
    () => router.push("/profile/wallet"),
    [router],
  );

  // TODO: finish calculateOfProfit
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
    if (userData) {
      if (postOrderData) {
        setAlertAboutCompleteTransaction(true);
      }

      if (pairsData) {
        const lastPrice = pairsData?.find(
          ({ baseCurrency, quoteCurrency }) =>
            quoteCurrency === pair.split("-")[0] &&
            baseCurrency === pair.split("-")[1],
        )?.lastPrice;

        setLastPriceOfPair(lastPrice);
      }

      const secondBalance =
        userData?.assetBalances.find(
          ({ currency }) => currency === pair.split("-")[1],
        )?.balance ?? 0;

      setSecondCurrency(`${secondBalance} ${pair.split("-")[1]}`);
    }
  }, [postOrderData, userData, pairsData]);

  return {
    router,
    alertMessage,
    notFounds,
    isSuccess,
    isLoading,
    secondCurrency,
    typeOfTrade,
    sumOfInvesting,
    alertAboutCompleteTransaction,
    lastPriceOfPair,
    handles: {
      handleTrade,
      handleNotFounds,
      handleAlertMessage,
      handleSumOfInvesting,
      handleAlertAboutCompleteTransaction,
      handleNotFoundsMemoized,
      routerPushWallet,
    },
  };
};
