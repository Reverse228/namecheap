import { useGetMe } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PleaseAuthButtons from "@/components/PleaseAuthButtons/pleaseAuthButtons";
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import FillWallet from "@/components/FillWallet";
import { CircleFadingPlus, DollarSign } from "lucide-react";

type Props = {
  secondBalance?: boolean;
};

const Header: FC<Props> = ({ secondBalance }) => {
  const searchParams = useSearchParams();

  const { data: userData, status } = useGetMe();

  const balance = userData?.assetBalances
    ? `${userData.assetBalances.find(({ currency }) => currency === "USD")?.balance}`
    : "0.00";

  const secondCurrency =
    searchParams.get("pair") && searchParams.get("pair")?.split("-")[0];

  const secondBalanceCount =
    secondBalance &&
    secondCurrency &&
    userData?.assetBalances &&
    `${userData.assetBalances.find(({ currency }) => currency === secondCurrency)?.balance ?? "0.00"} ${secondCurrency}`;

  return (
    <div className={"w-full pb-6 border-b  mb-5"}>
      <div className={"flex justify-between"}>
        {status === "loading" ? (
          <>
            <div className={"flex gap-2 items-center"}>
              <Skeleton className={"h-[24px] w-[72px]"} />
              <Skeleton className={"h-[24px] w-[172px]"} />
            </div>
            <Skeleton className={"h-[40px] w-[160px]"} />
          </>
        ) : (
          <>
            {status === "success" ? (
              <div className={"flex justify-between w-full flex-wrap gap-4"}>
                <div className={"flex gap-2 items-center flex-wrap"}>
                  <Label className={"text-muted-foreground"}>Доступно:</Label>
                  <Label className={"text-base flex items-center"}>
                    {balance} <DollarSign size={18} className={"-mt-[1.5px]"} />
                  </Label>
                  {secondBalance && (
                    <>
                      <Separator orientation="vertical" className={"max-h-4"} />
                      <Label className={"text-muted-foreground"}>
                        {secondBalanceCount}
                      </Label>
                    </>
                  )}
                </div>
                <FillWallet wallet={userData?.depositWallet ?? ""}>
                  <Button className={"gap-2"}>
                    <CircleFadingPlus size={16} /> Пополнить баланс
                  </Button>
                </FillWallet>
              </div>
            ) : (
              <>{status === "error" && <PleaseAuthButtons />}</>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
