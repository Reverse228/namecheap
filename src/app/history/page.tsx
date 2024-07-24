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
      <S.NoMessage>
        <Typography $color={rgba(Theme.colors.white, 0.6)} $fontSize={"24px"}>
          История отсуствует
        </Typography>
        <Typography $color={rgba(Theme.colors.white, 0.4)} $fontSize={"14px"}>
          Вся история сделок будет отображаться на этой странице
        </Typography>
      </S.NoMessage>
    </MainWrapper>
  );
};

export default History;
