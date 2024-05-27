import { useRouter } from "next/navigation";

export const usePair = () => {
  const router = useRouter();

  return { router };
};
