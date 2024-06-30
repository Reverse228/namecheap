"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DealRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("deals/completed");
  }, []);

  return <></>;
};

export default DealRedirect;
