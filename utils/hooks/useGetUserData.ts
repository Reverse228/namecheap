import { useState } from "react";
import { MeUserApi } from "@src/api/user/meUser";

export const useGetUserData = () => {
  const [userData, setUserData] = useState<MeUserApi | null>(null);

  const [trigger, setTrigger] = useState<boolean>(false);

  const handleTrigger = () => {
    setTrigger(trigger);
  };

  return {
    userData,
    handleTrigger,
  };
};
