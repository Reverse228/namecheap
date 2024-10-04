import { MeUserApi } from "@/api/GetMe";
import { AdminUsersActions } from "@/utils/types";
import { FC, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, Check, Pencil } from "lucide-react";
import InputLabel from "@/components/Input";
import { usePostAddBalance } from "@/api/adminApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  data: MeUserApi;
  open: AdminUsersActions;
  close: () => void;
};

const BalancesDrawer: FC<Props> = ({
  data: { id, name, assetBalances, depositWallet },
  open,
  close,
}) => {
  const { executeMutation: addBalance, status: addBalanceStatus } =
    usePostAddBalance();

  const { toast } = useToast();

  const mainBalance = assetBalances.find(({ currency }) => currency === "USD");

  const [change, setChange] = useState<boolean>(false);
  const [balanceChanged, setBalanceChanged] = useState<number>(
    mainBalance?.balance ?? 0,
  );

  const onSubmit = (currency: string | null) => {
    if (balanceChanged !== undefined && id) {
      addBalance({
        userId: id,
        amount: balanceChanged,
        currency,
      });
    }
  };

  useEffect(() => {
    if (addBalanceStatus === "success") {
      setChange(false);
      toast({
        description: "Баланс бользователя обновлен успешно!",
      });
    } else if (addBalanceStatus === "error") {
      setBalanceChanged(mainBalance?.balance ?? 0);
      setChange(false);

      toast({
        description: "Произошла ошибка при попытке обновить баланс!",
      });
    }
  }, [addBalanceStatus]);

  return (
    <Drawer
      open={open === "balances"}
      onOpenChange={(value) => {
        !value && close();
      }}
    >
      <DrawerContent className={"max-h-[90%]"} style={{ userSelect: "text" }}>
        <DrawerHeader>
          <DrawerTitle>Балансы пользователя {name}</DrawerTitle>
          <DrawerDescription>
            Просмотр средств на кошельке {depositWallet ?? "-"}
          </DrawerDescription>
        </DrawerHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Валюта</TableHead>
              <TableHead>Баланс</TableHead>
              <TableHead>Замороженный баланс</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetBalances.map(({ currency, balance, frozenBalance }, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{currency}</TableCell>
                  <TableCell>
                    <>
                      {balance} {currency}
                    </>
                  </TableCell>
                  <TableCell>{frozenBalance}</TableCell>
                  <TableCell className={"flex justify-end"}>
                    <>
                      <Button
                        size={"icon"}
                        variant={"secondary"}
                        className={"rounded-full"}
                        onClick={() => setChange(true)}
                      >
                        <Pencil size={16} />
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <DrawerFooter className={"items-end"}>
          <DrawerClose className={"w-fit"} asChild>
            <Button variant="outline">Зактрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BalancesDrawer;
