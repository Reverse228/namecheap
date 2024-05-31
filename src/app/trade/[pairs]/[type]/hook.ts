import { MeUser } from "@src/api";
import { MeUserApi } from "@src/api/user/meUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useTrade = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

  const userData =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData") ?? "");

  const router = useRouter();

  useEffect(() => {
    setIsLoadingPage(true);
  }, []);

  return {
    router,
    userData,
    isLoadingPage,
  };
};
