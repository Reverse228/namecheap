import { MeUserApi } from "@/api/GetMe";
import { AdminUsersActions } from "@/utils/types";
import { FC } from "react";
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
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetOrderItem } from "@/api/adminApi/GetOrderItem";

type Props = {
  data: MeUserApi;
  open: AdminUsersActions;
  close: () => void;
};

const SeeOrdersDrawer: FC<Props> = ({
  data: {
    id,
    name,
    email,
    role,
    accountStatus,
    country,
    phone,
    assetBalances,
    depositWallet,
  },
  open,
  close,
}) => {
  const { data: ordersItemData } = useGetOrderItem(id);

  return (
    <Drawer
      open={open === "orders"}
      onOpenChange={(value) => {
        !value && close();
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ордера пользователя {name}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
            </TableRow>
          </TableHeader>
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

export default SeeOrdersDrawer;
