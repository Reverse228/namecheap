"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TradeNoPage = ({ params }: { params: { pairs: string } }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${params.pairs}/market-transaction`);
  }, []);

  return <></>;
};

export default TradeNoPage;
