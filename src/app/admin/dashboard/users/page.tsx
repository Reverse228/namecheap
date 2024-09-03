"use client";

import MainAdminWrapper from "@/app/admin/components/MainAdminWrapper";
import { useGetAllUsers } from "@/api/adminApi";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminUsersActions } from "@/utils/types";
import { MeUserApi } from "@/api/GetMe";
import EditDialog from "@/app/admin/dashboard/users/components/edit";
import SeeOrdersDrawer from "@/app/admin/dashboard/users/components/seeOrders";

const Users = () => {
  const { data: usersData } = useGetAllUsers();

  const [openPopUp, setOpenPopUp] = useState<AdminUsersActions>(null);
  const [dataSelected, setDataSelected] = useState<MeUserApi | undefined>(
    undefined,
  );

  const handleOpenAction = (dialogId: AdminUsersActions, row: MeUserApi) => {
    setOpenPopUp(dialogId);
    setDataSelected(row);
  };

  const handleCloseAction = () => {
    setOpenPopUp(null);
    setDataSelected(undefined);
  };

  console.log(openPopUp);

  return (
    <MainAdminWrapper tabValue={"users"}>
      <Card>
        <CardHeader>
          <CardTitle>Пользователи</CardTitle>
          <CardDescription>Данные об всех пользователях</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Почта</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Баланс (USD)</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Страна</TableHead>
                <TableHead>Кошелек</TableHead>
                <TableHead className={"text-end"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData?.map((user, index) => {
                const {
                  name,
                  email,
                  accountStatus,
                  role,
                  assetBalances,
                  phone,
                  depositWallet,
                  country,
                } = user;

                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{accountStatus}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>
                      {assetBalances.find(({ currency }) => currency === "USD")
                        ?.balance ? (
                        <Label>
                          {
                            assetBalances.find(
                              ({ currency }) => currency === "USD",
                            )?.balance
                          }{" "}
                          USD
                        </Label>
                      ) : (
                        <Label className={"text-muted-foreground"}>0 USD</Label>
                      )}
                    </TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>{country}</TableCell>
                    <TableCell>
                      {depositWallet ? (
                        <TooltipProvider delayDuration={5}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Label
                                className={
                                  "overflow-hidden text-ellipsis whitespace-nowrap block w-28"
                                }
                              >
                                {depositWallet}
                              </Label>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{depositWallet}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Label className={"text-muted-foreground"}>-</Label>
                      )}
                    </TableCell>
                    <TableCell className={"flex justify-end gap-2"}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size={"icon"} variant={"secondary"}>
                            <EllipsisVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              handleOpenAction("edit", user);
                            }}
                          >
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleOpenAction("orders", user);
                            }}
                          >
                            Ордера
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {dataSelected && (
        <>
          <EditDialog
            data={dataSelected}
            open={openPopUp}
            close={handleCloseAction}
          />
          <SeeOrdersDrawer
            data={dataSelected}
            open={openPopUp}
            close={handleCloseAction}
          />
        </>
      )}
    </MainAdminWrapper>
  );
};

export default Users;
