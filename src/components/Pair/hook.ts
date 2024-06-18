import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const usePair = (baseCurrency?: string, quoteCurrency?: string) => {
  const router = useRouter();

  const [sum, setSum] = useState<string>("0");

  const handleSum = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setSum(numericValue);
  };

  return {
    router,
    sum,
    handles: { handleSum },
  };
};
