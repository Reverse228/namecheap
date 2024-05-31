import { MeUser } from "@src/api";
import { MeUserApi } from "@src/api/user/meUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useMainWrapper = () => {
  const currentUser =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData") ?? "");

  const router = useRouter();

  useEffect(() => {
    MeUser((value) => {
      typeof value !== "object" && localStorage.removeItem("userData");
    });
  }, []);

  return {
    router,
    currentUser,
  };
};
