import { useRouter } from "next/navigation";
import { useState } from "react";

export const usePair = () => {
  const router = useRouter();

  const [sum, setSum] = useState<string>("0");
  const [price, setPrice] = useState<string>("0");

  const handleSum = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setSum(numericValue);
  };

  const handlePrice = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");

    setPrice(numericValue);
  };

  return { router, sum, price, handles: { handleSum, handlePrice } };
};
