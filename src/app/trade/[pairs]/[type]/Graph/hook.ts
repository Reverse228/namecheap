import { useEffect, useState } from "react";
import { GetPairs, useGetMe } from "@api";
import { useRouter } from "next/navigation";

export const useGraph = (pair: string) => {
  const [graphData, setGraphData] = useState<string | undefined>(undefined);

  const { data: pairsData } = GetPairs();

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
  }, [pairsData]);

  return {
    graphData,
  };
};
