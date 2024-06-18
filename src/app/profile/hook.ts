import { destroyToken } from "@functions";
import { useRouter } from "next/navigation";
import { useGetMe } from "@api";
import { useState } from "react";
import Alert from "@components/Alert/Alert";

export const useProfile = () => {
  const router = useRouter();

  const { data: userData, isSuccess, isLoading } = useGetMe();

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const balance = isLoading
    ? "-"
    : userData?.assetBalances.find(({ currency }) => currency === "USDT")
        ?.balance ?? "0.00";

  const handleExist = () => {
    localStorage.removeItem("nodeAccess");
    destroyToken();

    window.location.reload();
  };

  const handleOpenQrCode = (value: boolean) => {
    setOpenPopUp(value);
  };

  const handleAlert = (value: boolean) => {
    setAlert(value);
  };

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(userData?.depositWallet as string)
      .then(() => {
        handleAlert(true);
      });
  };

  return {
    router,
    userData,
    isLoading,
    isSuccess,
    balance,
    openPopUp,
    alert,
    handles: {
      handleExist,
      handleOpenQrCode,
      handleCopyAddress,
      handleAlert,
    },
  };
};
