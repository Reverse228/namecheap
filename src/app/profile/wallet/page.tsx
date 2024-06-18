"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";
import * as S from "./styled";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";
import { useWallet } from "@src/app/profile/wallet/hook";
import TextField from "@components/TextField";

const Page = () => {
  const { userData, balance } = useWallet();

  return (
    <MainWrapper addMenu={{ active: "/profile" }} $gap={"12px"}>
      <S.Header>
        <S.TypographyGroup>
          <Typography $color={rgba(Theme.colors.white, 0.6)}>
            Кошелек:
          </Typography>
          <Typography>USD</Typography>
        </S.TypographyGroup>
        <S.TypographyGroup>
          <Typography $color={rgba(Theme.colors.white, 0.6)}>
            Баланс:
          </Typography>
          <Typography>{`${balance} USD`}</Typography>
        </S.TypographyGroup>
      </S.Header>
      <TextField label={"Способ оплаты"} />
      <TextField label={"Сумма к отправке"} />
      <TextField label={"Будет зачислено на кошелёк"} />
    </MainWrapper>
  );
};

export default Page;
