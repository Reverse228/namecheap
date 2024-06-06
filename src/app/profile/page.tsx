"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";

import * as S from "./styled";
import Typography from "@components/Typography/Typography";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import { useProfile } from "@src/app/profile/hook";
import Button from "@components/Button/Button";

const Profile = () => {
  const {
    userData,
    handles: { handleExist },
  } = useProfile();

  return (
    <MainWrapper addMenu={{ active: "/profile" }} $gap={"8px"}>
      <S.Header>
        {typeof userData === "object" && (
          <>
            <Typography $color={rgba(Theme.colors.white, 0.6)}>
              С возвращением
            </Typography>
            <Typography $fontSize={"18px"}>{userData?.name}</Typography>
          </>
        )}
      </S.Header>
      <S.ContentWrapper>
        <S.BalanceRow>
          <Typography $fontSize={"14px"} $color={rgba(Theme.colors.white, 0.6)}>
            Текущий баланс
          </Typography>
          <Typography>
            {typeof userData === "object"
              ? userData?.assetBalances.find(
                  ({ assetName }) => assetName === "USDT",
                )
                ? `${
                    userData?.assetBalances.find(
                      ({ assetName }) => assetName === "USDT",
                    )?.balance
                  } USD`
                : "0.00 USD"
              : "..."}
          </Typography>
        </S.BalanceRow>
        <S.BalanceRow>
          <Typography $fontSize={"14px"} $color={rgba(Theme.colors.white, 0.6)}>
            Открытый P/L
          </Typography>
          <Typography>
            {typeof userData === "object"
              ? userData?.assetBalances.find(
                  ({ assetName }) => assetName === "USDT",
                )
                ? `${
                    userData?.assetBalances.find(
                      ({ assetName }) => assetName === "USDT",
                    )?.balance
                  } USD`
                : "0.00 USD"
              : "..."}
          </Typography>
        </S.BalanceRow>
      </S.ContentWrapper>
      <Button
        label={"Выйти из системы"}
        $maxWith
        $margin={"24px 0 0 0"}
        onClick={handleExist}
      />
    </MainWrapper>
  );
};

export default Profile;
