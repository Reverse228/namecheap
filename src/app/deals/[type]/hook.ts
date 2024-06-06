import { useRouter } from "next/navigation";
import { useGetUserData } from "@utils/hooks";

export const useDeals = () => {
  const router = useRouter();

  const { userData } = useGetUserData();

  const handleChangeType = (type: "open" | "pending") => {
    router.replace(type);
  };

  return {
    router,
    userData,
    handles: {
      handleChangeType,
    },
  };
};
