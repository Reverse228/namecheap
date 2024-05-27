import { MeUser } from "@api";
import { GetPairs } from "@src/api/pairs";
import { GetPairsApi } from "@src/api/pairs/getPairs";
import { MeUserApi } from "@src/api/user/meUser";
import { useEffect, useState } from "react";

export const useAssets = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [pairsData, setPairsData] = useState<GetPairsApi | null>(null);
  const [userData, setUserData] = useState<MeUserApi | string | null>(null);

  const handleUserData = (value: MeUserApi | string) => {
    setUserData(value);
  };

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
    MeUser(handleUserData);
  }, []);

  return {
    pairsData,
    userData,
    handles: {
      handleSearch,
    },
  };
};
