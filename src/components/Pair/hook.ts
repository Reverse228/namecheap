import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const usePair = (getSum?: (value: number) => void) => {
  const router = useRouter();

  const [sum, setSum] = useState<string>("0");

  const handleSum = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setSum(numericValue);
    getSum && getSum(Number(numericValue));
  };

  return {
    router,
    sum,
    handles: { handleSum },
  };
};
