import { useEffect, useState } from "react";
import { MeUser, MeUserApi } from "@src/api/user/meUser";

export const useGetUserData = () => {
  const [userData, setUserData] = useState<MeUserApi | string | null>(
    localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData") ?? ""),
  );
  const [trigger, setTrigger] = useState<boolean>(false);

  const [apiUserData, setApiUserData] = useState<MeUserApi | string | null>();

  const handleTrigger = () => {
    setTrigger(trigger);
  };

  useEffect(() => {
    MeUser((data) => {
      setApiUserData(data);

      if (typeof data === "string") {
        localStorage.removeItem("userData");
      }
    });
  }, [trigger]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserData(
        apiUserData ??
          (localStorage.getItem("userData") &&
            JSON.parse(localStorage.getItem("userData") ?? "")),
      );
    }
  }, [apiUserData]);

  return {
    userData,
    handleTrigger,
  };
};
