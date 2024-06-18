import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetPairs, GetPairsApi } from "@src/api/pairs/getPairs";

export const useTradeNoPage = () => {
  const router = useRouter();

  const { data } = GetPairs();

  useEffect(() => {
    data &&
      router.replace(
        `trade/${data[0].quoteCurrency}-${data[0].baseCurrency}/market-transaction`,
      );
  }, [data]);

  return {};
};
