import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetCoinPriceBuy } from "@api";
import { CryptoCoinBuyPrice } from "@src/api/cryptoCoin/getCoinPriceBuy";
import { GetCoinPriceSell } from "@src/api/cryptoCoin/getCointPriceSell";

export const usePair = (baseCurrency?: string, quoteCurrency?: string) => {
  const router = useRouter();

  const [buyPrice, setBuyPrice] = useState<CryptoCoinBuyPrice | undefined>(
    undefined,
  );

  const [sellPrice, setSellPrice] = useState<CryptoCoinBuyPrice | undefined>(
    undefined,
  );

  const [sum, setSum] = useState<string>("0");
  const [price, setPrice] = useState<string>("0");

  const handleSum = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setSum(numericValue);
  };

  const handlePrice = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setPrice(numericValue);
  };

  useEffect(() => {
    GetCoinPriceBuy(quoteCurrency, baseCurrency).then((data) => {
      data && setBuyPrice(data);
    });

    GetCoinPriceSell(quoteCurrency, baseCurrency).then((data) => {
      data && setSellPrice(data);
    });
  }, []);

  return {
    router,
    sum,
    price,
    buyPrice,
    sellPrice,
    handles: { handleSum, handlePrice },
  };
};
