import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const usePair = (baseCurrency?: string, quoteCurrency?: string) => {
  const router = useRouter();

  const [sum, setSum] = useState<string>("0");
  const [price, setPrice] = useState<string>("...");

  const handleSum = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setSum(numericValue);
  };

  const handlePrice = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setPrice(numericValue);
  };

  useEffect(() => {}, []);

  return {
    router,
    sum,
    price,
    handles: { handleSum, handlePrice },
  };
};
