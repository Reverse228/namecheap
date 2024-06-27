import { destroyToken } from "@functions";
import { useRouter } from "next/navigation";
import { useGetMe } from "@api";
import { useState } from "react";

export const useProfile = () => {
  const router = useRouter();

  const { data: userData, isSuccess, isLoading } = useGetMe();

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [withdrawnPopUp, setWithdrawnPopUp] = useState<boolean>(false);

  const [withdrawnSum, setWithdrawnSum] = useState<string>("");
  const [withdrawnWalletAddress, setWithdrawnWalletAddress] =
    useState<string>("");

  const balance = isLoading
    ? "-"
    : userData?.assetBalances.find(({ currency }) => currency === "USD")
        ?.balance ?? "0.00";

  const frozenBalance = isLoading
    ? "-"
    : userData?.assetBalances.find(({ currency }) => currency === "USD")
        ?.frozenBalance ?? "0.00";

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

  const handleWithdrawnSum = (value: string) => {
    const newVal = value.replace(/[^\d.]/g, "");

    setWithdrawnSum(newVal);
  };

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(userData?.depositWallet as string)
      .then(() => {
        handleAlert(true);
      });
  };

  const handleWithdrawnWalletAddress = (value: string) => {
    setWithdrawnWalletAddress(value);
  };

  return {
    router,
    userData,
    isLoading,
    isSuccess,
    balance,
    openPopUp,
    alert,
    frozenBalance,
    withdrawnPopUp,
    withdrawnSum,
    withdrawnWalletAddress,
    handles: {
      handleExist,
      handleOpenQrCode,
      handleCopyAddress,
      handleAlert,
      setWithdrawnPopUp,
      handleWithdrawnSum,
      handleWithdrawnWalletAddress,
    },
  };
};
