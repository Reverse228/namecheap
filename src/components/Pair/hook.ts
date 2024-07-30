import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const usePair = (
  getSum?: (value: number) => void,
  priceStart?: number,
) => {
  const router = useRouter();

  const [sum, setSum] = useState<string>("0");
  const [price, setPrice] = useState<string | undefined>(undefined);

  const handleSum = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setSum(numericValue);
    getSum && getSum(Number(numericValue));
  };

  const handlePrice = (value: string) => {
    setPrice(!isNaN(Number(value)) ? value : priceStart?.toString());
  };

  useEffect(() => {
    if (price === undefined && priceStart) {
      setPrice(priceStart.toString());
    }
  }, [priceStart]);

  return {
    router,
    sum,
    price,
    handles: { handleSum, handlePrice },
  };
};
