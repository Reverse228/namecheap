"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";
import * as S from "./styled";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";
import { useTradeNoPage } from "@src/app/trade/hook";

const TradeNoPage = ({ params }: { params: { pairs: string } }) => {
  const {} = useTradeNoPage();

  return (
    <MainWrapper addHeader addMenu={{ active: "/trade" }}>
      <S.NoData>
        <Typography $color={rgba(Theme.colors.white, 0.6)} $fontSize={"24px"}>
          Загрузка...
        </Typography>
      </S.NoData>
    </MainWrapper>
  );
};

export default TradeNoPage;
