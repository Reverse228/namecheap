"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";
import * as S from "./styled";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";
import { useWallet } from "@src/app/profile/wallet/hook";
import TextField from "@components/TextField";
import SvgIcon from "@components/SvgIcon";
import InfoCircleSvg from "../../../../public/svg/InfoCircleSvg";
import QRCode from "react-qr-code";
import ArrowDownSvg from "../../../../public/svg/ArrowDownSvg";

const Page = () => {
  const { userData, balance } = useWallet();

  return (
    <MainWrapper
      addMenu={{ active: "/profile" }}
      $gap={"16px"}
      $alignItems={"center"}
    >
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
      <TextField label={"Способ оплаты"} value={"USDT TRC20"} disabled />
      <TextField
        label={"Адресс вашего кошелька"}
        value={userData?.depositWallet ?? "-"}
        disabled
      />
      <S.InfoBox>
        <SvgIcon>
          <InfoCircleSvg />
        </SvgIcon>{" "}
        <Typography>
          Для пополнения баланса стрества отправляются на адресс кошелька в
          формате USDT TRC20
        </Typography>
      </S.InfoBox>
      <S.ButtonGroup>
        <Typography $fontSize={"22px"}>QR-code вашего кошелька</Typography>
        <SvgIcon>
          <ArrowDownSvg />
        </SvgIcon>
        {userData?.depositWallet && (
          <QRCode
            value={userData?.depositWallet as string}
            style={{
              height: "auto",
              maxWidth: "200px",
              width: "200px",
              border: `1px dashed ${rgba(Theme.colors.white, 0.4)}`,
              borderRadius: "6px",
              padding: "16px",
            }}
            bgColor={"transparent"}
            fgColor={Theme.colors.white}
            level={"Q"}
          />
        )}
      </S.ButtonGroup>
    </MainWrapper>
  );
};

export default Page;
