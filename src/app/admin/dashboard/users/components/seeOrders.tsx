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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Label } from "@/components/ui/label";
import { useGetOrders } from "@/api/GetOrders";

type Props = {
  data: MeUserApi;
  open: AdminUsersActions;
  close: () => void;
};

const SeeOrdersDrawer: FC<Props> = ({ data: { id, name }, open, close }) => {
  const { data: ordersItemData } = useGetOrders(id);

  return (
    <Drawer
      open={open === "orders"}
      onOpenChange={(value) => {
        !value && close();
      }}
    >
      <DrawerContent className={"max-h-[90%]"} style={{ userSelect: "text" }}>
        <DrawerHeader>
          <DrawerTitle>Ордера пользователя {name}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Пара</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Дата</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersItemData &&
              ordersItemData.map(
                (
                  {
                    activePair: { baseCurrency, quoteCurrency },
                    amount,
                    price,
                    margin,
                    orderCategory,
                    orderStatus,
                    orderType,
                    timestamp,
                  },
                  idx,
                ) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        {baseCurrency} / {quoteCurrency}
                      </TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{price}</TableCell>
                      <TableCell>{margin}</TableCell>
                      <TableCell>{orderCategory}</TableCell>
                      <TableCell>{orderStatus}</TableCell>
                      <TableCell>{orderType}</TableCell>
                      <TableCell>
                        {dayjs(timestamp).format("DD-MM-YYYY HH:mm:ss")}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
          </TableBody>
        </Table>
        {!ordersItemData?.length && (
          <Label className={"my-4 w-full text-center z-50"}>
            У данного пользователя нету ордеров
          </Label>
        )}
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
