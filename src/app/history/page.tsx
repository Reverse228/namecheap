"use client";

import MainWrapper from "@/components/MainWrapper/layout";
import { useGetHistory, useGetMe } from "@/api";
import NoUserLogin from "@/components/NoUserLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderHistory from "@/app/history/orders_history";
import TransactionHistory from "@/app/history/transaction_history";
import { SquareStack } from "lucide-react";
import { History as HistoryIcon } from "lucide-react";

const History = () => {
  const { status: userStatus } = useGetMe();

  return (
    <MainWrapper header menu={"/history"}>
      <NoUserLogin
        label={"чтобы увидеть свою историю"}
        userStatus={userStatus}
      />

      <Tabs defaultValue="order_history" className="w-full">
        <TabsList className={"w-full *:w-full"}>
          <TabsTrigger
            value="order_history"
            disabled={userStatus === "loading" || userStatus === "error"}
            className={"gap-2"}
          >
            <SquareStack size={16} /> История ордеров
          </TabsTrigger>
          <TabsTrigger
            value="transaction_history"
            disabled={userStatus === "loading" || userStatus === "error"}
            className={"gap-2"}
          >
            <HistoryIcon size={16} /> История транзакций
          </TabsTrigger>
        </TabsList>
        <TabsContent value="order_history">
          <OrderHistory />
        </TabsContent>
        <TabsContent value="transaction_history">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </MainWrapper>
  );
};

export default History;
