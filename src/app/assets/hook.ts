import { GetPairs } from "@src/api/pairs";
import { GetPairsApi } from "@src/api/pairs/getPairs";
import { useEffect, useState } from "react";
import { useGetUserData } from "@utils/hooks";

export const useAssets = () => {
  const [pairsData, setPairsData] = useState<GetPairsApi | null>(null);
  const [searchData, setSearchData] = useState<GetPairsApi | null>(null);

  const { userData } = useGetUserData();

  const handleSearch = (value: string | null) => {
    const searchPaird = value?.trim()
      ? pairsData?.filter(
          ({ baseCurrency, quoteCurrency }) =>
            value?.toLowerCase() === baseCurrency.toLowerCase() ||
            value?.toLowerCase() === quoteCurrency.toLowerCase(),
        )
      : pairsData;

    setSearchData(searchPaird ?? null);
  };

  const handlePairsData = (value: GetPairsApi) => {
    setPairsData(value);
  };

  useEffect(() => {
    GetPairs((value) => {
      handlePairsData(value);
      setSearchData(value);
    });
  }, []);

  return {
    searchData,
    userData,
    handles: {
      handleSearch,
    },
  };
};
