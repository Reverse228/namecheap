import { useRouter } from "next/navigation";

export const useMenu = () => {
  const router = useRouter();

  const handlePushPage = (path: string) => {
    router.push(path);
  };

  return {
    handles: {
      handlePushPage,
    },
  };
};
