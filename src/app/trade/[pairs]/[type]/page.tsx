"use client";

import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import { useTrade } from "./hook";
import { AdvancedRealTimeChartProps } from "react-ts-tradingview-widgets";
import dynamic from "next/dynamic";

import * as S from "./styled";
import Pair from "@src/components/Pair/Pair";
import Button from "@src/components/Button/Button";
import PopUp from "@components/PopUp/PopUp";
import Alert from "@src/components/Alert/Alert";
import { ComponentType, useEffect, useState } from "react";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";

const AdvancedRealTimeChart: ComponentType<AdvancedRealTimeChartProps> =
  dynamic(
    () =>
      import("react-ts-tradingview-widgets").then(
        (w) => w.AdvancedRealTimeChart,
      ),
    {
      ssr: false,
    },
  );

const Trade = ({ params }: { params: { pairs: string; type: string } }) => {
  const {
    router,
    alertMessage,
    notFounds,
    isSuccess,
    isLoading,
    handles: { handleTrade, handleNotFounds, handleAlertMessage },
  } = useTrade();

  return (
    <MainWrapper
      addMenu={{
        active: "/trade",
      }}
      addHeader
      $gap="24px"
    >
      {alertMessage && (
        <Alert
          type="error"
          description={alertMessage}
          setState={handleAlertMessage}
        />
      )}

      <PopUp
        appear={notFounds}
        closePopUp={() => handleNotFounds(false)}
        bottomButton={{
          label: "Пополнить кошелек",
          variant: "active",
        }}
        header={"Сделка отменена"}
        messages={
          "У вас недостаточный баланс кошелька для выполнения этой сделки. Пожалуйста, уменьшите размер сделки или пополните свой кошелек."
        }
      />

      {isLoading ? (
        <></>
      ) : (
        <>
          <Pair
            buy={{ path: params.type }}
            onClickBuy={(priceBuy, sum) =>
              handleTrade("BUY", params.pairs, sum)
            }
            onCLickSell={(priceBuy, sum) =>
              handleTrade("SELL", params.pairs, sum)
            }
            disableButtons={!isSuccess}
            quoteCurrency={params.pairs.split("-")[0]}
            baseCurrency={params.pairs.split("-")[1]}
          />

          <S.Graph>
            {!isSuccess && (
              <S.NoUser>
                <Button label="Войти" onClick={() => router.push("/logIn")} />
                <Button
                  label="Зарегестрироваться"
                  $variant="active"
                  onClick={() => router.push("/register")}
                />
              </S.NoUser>
            )}
            {params.pairs ? (
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
                  "header_indicators",
                  "border_around_the_chart",
                ]}
                allow_symbol_change={false}
                symbol={params.pairs.split("-").reverse().join("")}
                save_image={false}
              />
            ) : (
              <Typography
                $color={rgba(Theme.colors.white, 0.6)}
                $fontSize={"24px"}
              >
                Таблица загружается
              </Typography>
            )}
          </S.Graph>
        </>
      )}
    </MainWrapper>
  );
};

export default Trade;
