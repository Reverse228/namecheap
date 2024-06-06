import { useGetUserData } from "@utils/hooks";
import { useEffect } from "react";
import { GetWallet } from "@src/api/wallet/getWallet";
import { destroyToken } from "@functions";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const { userData } = useGetUserData();

  const router = useRouter();

  const handleExist = () => {
    localStorage.removeItem("userData");
    destroyToken();

    router.push("/");
  };

  useEffect(() => {
    GetWallet().then((data) => {
      console.log(data);
    });
  }, []);

  return {
    userData,
    handles: {
      handleExist,
    },
  };
};
