import { MeUser } from "@api";
import { GetPairs } from "@src/api/pairs";
import { GetPairsApi } from "@src/api/pairs/getPairs";
import { useEffect, useState } from "react";

export const useAssets = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [pairsData, setPairsData] = useState<GetPairsApi | null>(null);

  const handleSearch = (value: string | null) => {
    setSearch(value);
  };

  const handlePairsData = (value: GetPairsApi) => {
    setPairsData(value);
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    GetPairs(handlePairsData);
  }, []);

  return {
    pairsData,
    handles: {
      handleSearch,
    },
  };
};
