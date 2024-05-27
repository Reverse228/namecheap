import { MeUser } from "@src/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useTrade = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoadingPage(true);
  }, []);

  return {
    router,
    isLoadingPage,
  };
};
