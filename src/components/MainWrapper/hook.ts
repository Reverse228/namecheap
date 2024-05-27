import { MeUser } from "@src/api";
import { MeUserApi } from "@src/api/user/meUser";
import { useEffect, useState } from "react";

export const useMainWrapper = () => {
  const [userData, setUserData] = useState<MeUserApi | null>(null);

  const handleUserData = (value: any) => {
    setUserData(value);
  };

  useEffect(() => {
    MeUser(handleUserData);
  }, []);

  return {
    userData,
  };
};
