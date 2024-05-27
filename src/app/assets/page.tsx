"use client";

import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import { useAssets } from "./hook";

import Typography from "@src/components/Typography/Typography";
import Search from "@src/components/Search/Search";
import Pair from "@src/components/Pair/Pair";

import * as S from "./styled";
import Link from "next/link";
import SvgIcon from "@src/components/SvgIcon";
import AlertSvg from "../../../public/svg/AlertSvg";
import { Theme } from "@utils";

const Assets = () => {
  const {
    pairsData,
    userData,
    handles: { handleSearch },
  } = useAssets();

  return (
    <MainWrapper addMenu={{ active: "/assets" }} $gap="24px" addHeader>
      <Search setSearchInput={handleSearch} />
      {pairsData && userData ? (
        <S.PairsWrapper>
          {userData && typeof userData == "string" && (
            <S.AlertMessage>
              <SvgIcon $fill={Theme.colors.orange}>
                <AlertSvg />
              </SvgIcon>

              <Typography $fontSize="14px">
                <S.CustomLink href={"/logIn"}>Войдите</S.CustomLink> или{" "}
                <S.CustomLink href={"/register"}>
                  Зарегестрируйтесь
                </S.CustomLink>{" "}
                чтобы иметь возможность торговать активыми
              </Typography>
            </S.AlertMessage>
          )}

          {pairsData.map(({ quoteCurrency, baseCurrency }, idx) => (
            <Pair
              key={idx}
              disableButtons={typeof userData == "string"}
              quoteCurrency={quoteCurrency}
              baseCurrency={baseCurrency}
            />
          ))}
        </S.PairsWrapper>
      ) : (
        <Typography>Подгружаем активы...</Typography>
      )}
    </MainWrapper>
  );
};

export default Assets;
