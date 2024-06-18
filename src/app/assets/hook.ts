import { GetPairs } from "@src/api/pairs";
import { GetPairsApi } from "@src/api/pairs/getPairs";
import { useEffect, useState } from "react";
import { useGetMe } from "@api";

export const useAssets = () => {
  const [searchData, setSearchData] = useState<GetPairsApi | undefined>(
    undefined,
  );

  const {
    data: userData,
    isSuccess: isSuccessUserData,
    isLoading: isLoadingUserData,
  } = useGetMe();
  const { data: pairsData, isLoading } = GetPairs();

  const handleSearch = (value: string | null) => {
    const searchPaird = value?.trim()
      ? pairsData?.filter(
          ({ baseCurrency, quoteCurrency }) =>
            value?.toLowerCase() === baseCurrency.toLowerCase() ||
            value?.toLowerCase() === quoteCurrency.toLowerCase(),
        )
      : pairsData;

    setSearchData(searchPaird);
  };

  useEffect(() => {
    if (pairsData) {
      setSearchData(pairsData);
    }
  }, [pairsData]);

  return {
    searchData,
    userData,
    isLoading,
    isSuccessUserData,
    isLoadingUserData,
    handles: {
      handleSearch,
    },
  };
};
