"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";

import * as S from "./styled";
import Typography from "@components/Typography/Typography";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import { useProfile } from "@src/app/profile/hook";
import Button from "@components/Button/Button";
import SvgIcon from "@components/SvgIcon";
import CopySvg from "../../../public/svg/CopySvg";
import QrCodeSvg from "../../../public/svg/QrCodeSvg";
import PopUp from "@components/PopUp/PopUp";
import QRCode from "react-qr-code";
import Alert from "@components/Alert/Alert";

const Profile = () => {
  const {
    router,
    userData,
    isSuccess,
    balance,
    openPopUp,
    alert,
    handles: { handleExist, handleOpenQrCode, handleCopyAddress, handleAlert },
  } = useProfile();

  return (
    <MainWrapper addMenu={{ active: "/profile" }} $gap={"8px"}>
      {alert && (
        <Alert
          type={"success"}
          setState={() => handleAlert(false)}
          description={"Адресс кошелька был скопирован"}
        />
      )}

      <PopUp
        appear={openPopUp}
        closePopUp={() => handleOpenQrCode(false)}
        header={"Ваш QR-code"}
        messages={
          <QRCode
            value={userData?.depositWallet as string}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            bgColor={"transparent"}
            fgColor={Theme.colors.white}
            level={"Q"}
          />
        }
      />

      <S.Header>
        {isSuccess && (
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
            {isSuccess ? (balance ? `${balance} USD` : "-") : "-"}
          </Typography>
        </S.BalanceRow>
        <S.BalanceRow>
          <Typography $fontSize={"14px"} $color={rgba(Theme.colors.white, 0.6)}>
            Открытый P/L
          </Typography>
          <Typography>
            {isSuccess ? (balance ? `${balance} USD` : "-") : "-"}
          </Typography>
        </S.BalanceRow>
      </S.ContentWrapper>

      <S.ContentWrapper>
        <S.BalanceRow>
          <Typography $fontSize={"14px"} $color={rgba(Theme.colors.white, 0.6)}>
            Ваш адресс кошелька
          </Typography>

          <S.WalletGroup>
            <Typography>
              {isSuccess ? (balance ? userData?.depositWallet : "-") : "-"}
            </Typography>
            {isSuccess && (
              <>
                <Button label={""} $padding={"8px"} onClick={handleCopyAddress}>
                  <SvgIcon>
                    <CopySvg />
                  </SvgIcon>
                </Button>
                <Button
                  label={""}
                  $padding={"8px"}
                  onClick={() => handleOpenQrCode(true)}
                >
                  <SvgIcon>
                    <QrCodeSvg />
                  </SvgIcon>
                </Button>
              </>
            )}
          </S.WalletGroup>
        </S.BalanceRow>
      </S.ContentWrapper>
      {isSuccess ? (
        <S.ButtonGroup $direction={"column"}>
          <Button
            label="Пополнить баланс"
            $variant="active"
            onClick={() => router.push("/profile/wallet")}
            $maxWith
          />
          <Button label="Запросить поддержку" $maxWith />
          <Button
            label={"Выйти из системы"}
            $maxWith
            onClick={handleExist}
            $margin={"24px 0 0 0"}
          />
        </S.ButtonGroup>
      ) : (
        <S.ButtonGroup>
          <Button
            label="Войти"
            onClick={() => router.push("/logIn")}
            $maxWith
          />
          <Button
            label="Зарегестрироваться"
            $variant="active"
            onClick={() => router.push("/register")}
            $maxWith
          />
        </S.ButtonGroup>
      )}
    </MainWrapper>
  );
};

export default Profile;
