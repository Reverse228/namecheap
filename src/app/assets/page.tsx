"use client";

import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import { useAssets } from "./hook";

import Typography from "@src/components/Typography/Typography";
import Search from "@src/components/Search/Search";
import Pair from "@src/components/Pair/Pair";

import SvgIcon from "@src/components/SvgIcon";
import AlertSvg from "../../../public/svg/AlertSvg";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

import * as S from "./styled";

const Assets = () => {
  const {
    searchData,
    userData,
    handles: { handleSearch },
  } = useAssets();

  return (
    <MainWrapper addMenu={{ active: "/assets" }} $gap="24px" addHeader>
      <Search setSearchInput={handleSearch} />
      {searchData ? (
        <S.PairsWrapper>
          {!userData && (
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

          {searchData.length > 0 ? (
            searchData.map(({ quoteCurrency, baseCurrency }, idx) => (
              <Pair
                key={idx}
                disableButtons={!userData}
                quoteCurrency={quoteCurrency}
                baseCurrency={baseCurrency}
              />
            ))
          ) : (
            <S.NoData>
              <Typography
                $color={rgba(Theme.colors.white, 0.6)}
                $fontSize={"24px"}
              >
                Ничего не найдено...
              </Typography>
            </S.NoData>
          )}
        </S.PairsWrapper>
      ) : (
        <S.NoData>
          <Typography $color={rgba(Theme.colors.white, 0.6)} $fontSize={"24px"}>
            Подгружаем активы...
          </Typography>
        </S.NoData>
      )}
    </MainWrapper>
  );
};

export default Assets;
