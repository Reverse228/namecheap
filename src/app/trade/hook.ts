import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetPairs, GetPairsApi } from "@src/api/pairs/getPairs";

export const useTradeNoPage = () => {
  const router = useRouter();

  const [pairsData, setPairsData] = useState<GetPairsApi | null>(null);

  const handlePairsData = (value: GetPairsApi) => {
    setPairsData(value);
  };

  useEffect(() => {
    GetPairs(handlePairsData);
  }, []);

  useEffect(() => {
    pairsData &&
      router.replace(
        `trade/${pairsData[0].quoteCurrency}-${pairsData[0].baseCurrency}/market-transaction`,
      );
  }, [pairsData]);

  return {};
};
