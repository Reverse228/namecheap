import { GetPairs, GetPairsApi } from "@src/api/pairs/getPairs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useMenu = () => {
  const [pairsData, setPairsData] = useState<GetPairsApi | null>(null);

  const router = useRouter();

  const handlePairsData = (value: GetPairsApi) => {
    setPairsData(value);
  };

  const handlePushPage = (path: string) => {
    if (path === "/trade") {
      if (pairsData) {
        router.push(
          `/trade/${pairsData[0].quoteCurrency}-${pairsData[0].baseCurrency}`
        );
      }
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    GetPairs(handlePairsData);
  }, []);

  return {
    handles: {
      handlePushPage,
    },
  };
};
