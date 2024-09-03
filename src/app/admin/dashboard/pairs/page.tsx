"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPairs } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

import { useState } from "react";
import MainAdminWrapper from "@/app/admin/components/MainAdminWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminPairsActions } from "@/utils/types";
import EditDialog from "@/app/admin/dashboard/pairs/components/edit";
import CreateDialog from "@/app/admin/dashboard/pairs/components/create";
import DeleteAlert from "@/app/admin/dashboard/pairs/components/delete";

type CreatePair = {
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  lastPrice: number;
};

const Pairs = () => {
  // State to keep track of which dialog is open
  const [openDialog, setOpenDialog] = useState<AdminPairsActions>(null);
  const [dataSelected, setDataSelected] = useState<CreatePair | undefined>(
    undefined,
  );

  const { data: pairsData, status: pairsStatus } = useGetPairs();

  const handleOpenAction = (dialogId: AdminPairsActions, row: CreatePair) => {
    setOpenDialog(dialogId);
    setDataSelected(row);
  };

  const handleCloseAction = () => {
    setOpenDialog(null);
    setDataSelected(undefined);
  };

  return (
    <MainAdminWrapper tabValue={"pairs"}>
      <Card>
        <CardHeader>
          <CardTitle>Активы</CardTitle>
          <CardDescription className={"w-full flex justify-between"}>
            Данные активов
            <CreateDialog>
              <Button size={"sm"}>Создать пару</Button>
            </CreateDialog>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название пары</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead className={"text-end"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pairsData?.map(
                ({ quoteCurrency, baseCurrency, type, lastPrice }, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {baseCurrency}/{quoteCurrency}
                    </TableCell>
                    <TableCell>{lastPrice} USD</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell className={"flex justify-end gap-2"}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size={"icon"} variant={"secondary"}>
                            <EllipsisVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenAction("edit", {
                                quoteCurrency,
                                baseCurrency,
                                type,
                                lastPrice,
                              })
                            }
                          >
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={"text-red-500"}
                            onClick={() =>
                              handleOpenAction("delete", {
                                quoteCurrency,
                                baseCurrency,
                                type,
                                lastPrice,
                              })
                            }
                          >
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {dataSelected && (
        <>
          <EditDialog
            data={dataSelected}
            open={openDialog}
            close={handleCloseAction}
          />
          <DeleteAlert
            data={dataSelected}
            open={openDialog}
            close={handleCloseAction}
          />
        </>
      )}
    </MainAdminWrapper>
  );
};

export default Pairs;
