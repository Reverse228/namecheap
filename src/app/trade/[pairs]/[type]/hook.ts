import { MeUser } from "@src/api";
import { MeUserApi } from "@src/api/user/meUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useTrade = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [userData, setUserData] = useState<MeUserApi | string | null>(null);

  const router = useRouter();

  const handleUserData = (value: MeUserApi | string) => {
    setUserData(value);
  };
  useEffect(() => {
    setIsLoadingPage(true);

    MeUser(handleUserData);
  }, []);

  return {
    router,
    userData,
    isLoadingPage,
  };
};
