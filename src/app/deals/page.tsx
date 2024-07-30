"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DealRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("deals/open");
  }, []);

  return <></>;
};

export default DealRedirect;
