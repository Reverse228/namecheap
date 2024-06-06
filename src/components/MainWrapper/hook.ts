import { MeUser } from "@src/api";
import { MeUserApi } from "@src/api/user/meUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserData } from "@utils/hooks";

export const useMainWrapper = () => {
  const { userData } = useGetUserData();

  const router = useRouter();

  return {
    router,
    userData,
  };
};
