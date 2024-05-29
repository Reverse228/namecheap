"use client";

import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import { useTrade } from "./hook";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

import * as S from "./styled";
import Pair from "@src/components/Pair/Pair";
import Button from "@src/components/Button/Button";

const Trade = ({ params }: { params: { pairs: string; type: string } }) => {
  const { isLoadingPage, router, userData } = useTrade();

  return (
    <MainWrapper
      addMenu={{
        active: "/trade",
      }}
      addHeader
      $gap="24px"
    >
      {
        <Pair
          buy={{ path: params.type }}
          disableButtons={typeof userData === "string" || !userData}
          quoteCurrency={params.pairs.split("-")[0]}
          baseCurrency={params.pairs.split("-")[1]}
        />
      }

      {userData && (
        <S.Graph>
          {typeof userData === "string" && (
            <S.NoUser>
              <Button label="Войти" onClick={() => router.push("/logIn")} />
              <Button
                label="Зарегестрироваться"
                $variant="active"
                onClick={() => router.push("/register")}
              />
            </S.NoUser>
          )}
          {isLoadingPage && (
            <AdvancedRealTimeChart
              theme="dark"
              hide_side_toolbar
              autosize
              copyrightStyles={{
                parent: { display: "none" },
              }}
              disabled_features={[
                "header_symbol_search",
                "compare_symbol",
                "border_around_the_chart",
              ]}
              allow_symbol_change={false}
              symbol={params.pairs.split("-").join("")}
              save_image={false}
            />
          )}
        </S.Graph>
      )}
    </MainWrapper>
  );
};

export default Trade;
