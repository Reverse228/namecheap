import { useGetMe } from "@/api";
import { ASSETS } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldBan } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  children: ReactNode;
};

const MainAdminWrapper: FC<Props> = ({ children }) => {
  const router = useRouter();

  const { data: userData, status: userStatus } = useGetMe();

  const handleGoBack = () => {
    router.push(ASSETS);
  };

  return userStatus === "loading" ? (
    <div
      className={"absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4"}
    >
      <LoadingSpinner />
    </div>
  ) : (
    <>
      {userStatus === "success" && userData?.role !== "ADMIN" ? (
        <div
          className={
            "absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4"
          }
        >
          <div className={"flex flex-col items-center gap-4"}>
            <Alert className={"mb-5"} variant={"destructive"}>
              <ShieldBan className="h-4 w-4" />
              <AlertTitle>Внимания</AlertTitle>
              <AlertDescription>
                Недостаточно прав для посещения данной странице! <br />
                Настоятельно рекомендуем
                <Button
                  variant={"link"}
                  size={"sm"}
                  className={"p-0 pl-1 text-foreground"}
                  onClick={handleGoBack}
                >
                  вернутся назад
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default MainAdminWrapper;
