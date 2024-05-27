"use client";

import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import { useTrade } from "./hook";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

import * as S from "./styled";
import Pair from "@src/components/Pair/Pair";

const Trade = ({ params }: { params: { pairs: string } }) => {
  const { isLoadingPage, router } = useTrade();

  return (
    <MainWrapper
      addMenu={{
        active: "/trade",
      }}
      addHeader
      $gap="24px"
    >
      <Pair
        quoteCurrency={params.pairs.split("-")[0]}
        baseCurrency={params.pairs.split("-")[1]}
      />

      <S.Graph>
        {isLoadingPage && (
          <AdvancedRealTimeChart
            theme="dark"
            hide_side_toolbar
            autosize
            copyrightStyles={{
              parent: { display: "none" },
            }}
            allow_symbol_change={false}
            symbol={params.pairs.split("-").join("")}
          />
        )}
      </S.Graph>
    </MainWrapper>
  );
};

export default Trade;
