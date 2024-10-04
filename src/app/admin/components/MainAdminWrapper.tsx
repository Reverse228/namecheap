import { useGetMe } from "@/api";
import { ASSETS, LOGIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldBan } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  children: ReactNode;
  className?: string;
  tabValue?: "pairs" | "users" | "calls";
};

const MainAdminWrapper: FC<Props> = ({ children, className, tabValue }) => {
  const router = useRouter();

  const { data: userData, status: userStatus } = useGetMe();

  const handleRoute = (path: string) => {
    router.replace(path);
  };

  const handleGoBack = () => {
    router.push(ASSETS);
  };

  useEffect(() => {
    if (userStatus === "error") {
      router.push(LOGIN);
    }
  }, [userStatus]);

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
        <>
          {userStatus === "success" && userData?.role === "ADMIN" && (
            <div className={cn("p-4 flex flex-col gap-4", className)}>
              <Tabs onValueChange={handleRoute} value={tabValue}>
                <TabsList>
                  <TabsTrigger value="pairs">Активы</TabsTrigger>
                  <TabsTrigger value="users">Пользователи</TabsTrigger>
                  <TabsTrigger value="calls">Звонки</TabsTrigger>
                </TabsList>
              </Tabs>
              {children}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MainAdminWrapper;
