import { useEffect, useState } from "react";
import { PostOrder, useGetMe } from "@api";

export const useTrade = (pair: string) => {
  const [secondCurrency, setSecondCurrency] = useState<string | null>(null);

  const { data: userData } = useGetMe();
  const { data: postOrderData } = PostOrder();

  useEffect(() => {
    if (userData) {
      const secondBalance =
        userData?.assetBalances.find(
          ({ currency }) => currency === pair.split("-")[1],
        )?.balance ?? 0;

      setSecondCurrency(`${secondBalance} ${pair.split("-")[1]}`);
    }
  }, [postOrderData, userData]);

  return {
    secondCurrency,
  };
};
