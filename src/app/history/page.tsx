"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";
import { useHistory } from "@src/app/history/hook";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";
import React from "react";
import * as S from "./styled";

const History = () => {
  const { positionsData } = useHistory();

  return (
    <MainWrapper addMenu={{ active: "/history" }} addHeader $gap={"24px"}>
      {positionsData?.length ? (
        <S.TableWrapper>
          <S.Table>
            <S.Row>
              <S.HeadCell>ID</S.HeadCell>
              <S.HeadCell>Пара</S.HeadCell>
              <S.HeadCell>Сумма</S.HeadCell>
              <S.HeadCell>Цена</S.HeadCell>
              <S.HeadCell>Статус</S.HeadCell>
              <S.HeadCell>Тип</S.HeadCell>
              <S.HeadCell>Ордер</S.HeadCell>
              <S.HeadCell>Дата</S.HeadCell>
            </S.Row>

            {positionsData.map(
              (
                {
                  status,
                  order: {
                    activePair: { baseCurrency, quoteCurrency, type },
                    price,
                    orderType,
                    orderCategory,
                  },
                  amount,
                  timestamp,
                },
                idx,
              ) => {
                const date = new Date(timestamp);
                return (
                  <S.Row key={idx} $color={idx % 2 === 0}>
                    <S.Cell>{idx + 1}</S.Cell>
                    <S.Cell>{`${baseCurrency}/${quoteCurrency}`}</S.Cell>
                    <S.Cell>
                      {amount} {baseCurrency}
                    </S.Cell>
                    <S.Cell>{price} USD</S.Cell>
                    <S.Cell>{status}</S.Cell>
                    <S.Cell>{orderType}</S.Cell>
                    <S.Cell>{orderCategory}</S.Cell>
                    <S.Cell>
                      {date.getDay()}/{date.getMonth()}/{date.getFullYear()}{" "}
                      {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                    </S.Cell>
                  </S.Row>
                );
              },
            )}
          </S.Table>
        </S.TableWrapper>
      ) : (
        <S.NoMessage>
          <Typography $color={rgba(Theme.colors.white, 0.6)} $fontSize={"24px"}>
            История отсуствует
          </Typography>
          <Typography $color={rgba(Theme.colors.white, 0.4)} $fontSize={"14px"}>
            Вся история сделок будет отображаться на этой странице
          </Typography>
        </S.NoMessage>
      )}
    </MainWrapper>
  );
};

export default History;
