import { useGetWalletHistory } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionHistory = () => {
  const { data: walletHistoryData, status: walletHistoryStatus } =
    useGetWalletHistory();

  const skeletonArray = new Array(10).fill(0);

  return !(walletHistoryStatus === "error") ? (
    <>
      {!(walletHistoryStatus === "loading") ? (
        <div className={"border rounded-lg overflow-x-scroll"}>
          <Table className={"w-full"}>
            <TableHeader>
              <TableRow className={"*:whitespace-nowrap"}>
                {/*<TableHead>ID</TableHead>*/}
                <TableHead>ID</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>ID транзакции</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Дата</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {walletHistoryData?.map(
                (
                  { id, amount, transactionID, cashFlowType, timestamp },
                  idx,
                ) => (
                  <TableRow key={id} className={`*:whitespace-nowrap  `}>
                    <TableCell className={"text-muted-foreground text-xs"}>
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      {amount} <Label className={"text-xs"}>USD</Label>
                    </TableCell>
                    <TableCell>{transactionID} </TableCell>
                    <TableCell>{cashFlowType}</TableCell>
                    <TableCell className={"text-muted-foreground text-xs"}>
                      {dayjs(timestamp).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className={"flex flex-col gap-4"}>
          <Skeleton className={"w-full h-[48px]"} />
          {skeletonArray.map((_, idx) => (
            <Skeleton className={"w-full h-[24px]"} key={idx} />
          ))}
        </div>
      )}
    </>
  ) : (
    <></>
  );
};

export default TransactionHistory;
