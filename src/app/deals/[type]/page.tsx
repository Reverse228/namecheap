"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";

import Button from "@components/Button/Button";
import { Theme } from "@utils";
import { useDeals } from "@src/app/deals/[type]/hook";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import SvgIcon from "@components/SvgIcon";
import CloseSvg from "../../../../public/svg/CloseSvg";
import * as S from "./styled";
import React from "react";
import PopUp from "@components/PopUp/PopUp";
import AlertSvg from "../../../../public/svg/AlertSvg";

const Deals = ({ params }: { params: { type: string } }) => {
  const {
    router,
    isSuccess,
    isLoading,
    popUp,
    orderId,
    filteredData,
    handles: { handleChangeType, handleCancelOrder, handlePopUp },
  } = useDeals(params);

  return (
    <MainWrapper
      addMenu={{
        active: "/deals",
      }}
      $alignItems={"center"}
    >
      <PopUp
        appear={popUp}
        header={"Подтвердите действия"}
        messages={"Вы уверены что хотите отменить данную сделку?"}
        closePopUp={() => handlePopUp(false)}
        bottomButton={{
          label: "Да",
          variant: "active",
          onClick: () => {
            handleCancelOrder(orderId);
            handlePopUp(false);
          },
        }}
      />

      <S.ButtonGroup $gap={"8px"}>
        <Button
          label={"Открытые"}
          $maxWith
          $bg={params.type === "open" ? Theme.colors.lightBlue : undefined}
          onClick={() => handleChangeType("open")}
        />
        <Button
          label={"Отложенные"}
          $maxWith
          $bg={params.type === "pending" ? Theme.colors.lightBlue : undefined}
          onClick={() => handleChangeType("pending")}
        />
      </S.ButtonGroup>

      {isLoading ? (
        <Typography
          $color={rgba(Theme.colors.white, 0.6)}
          $fontSize={"24px"}
          $margin={"64px 0 0 0"}
        >
          Загрузка сделок
        </Typography>
      ) : isSuccess ? (
        <S.RowsWrapper>
          {filteredData?.length ? (
            filteredData?.map(
              ({
                pair,
                amount,
                price,
                orderStatus,
                orderCategory,
                orderType,
                timestamp,
                id,
              }) => {
                const date = new Date(timestamp as string);
                return (
                  <S.Row key={id}>
                    <S.Header>
                      <S.Name $fontSize={"18px"}>
                        {pair.baseCurrency} / {pair.quoteCurrency}
                      </S.Name>
                      {orderStatus === "OPEN" ? (
                        <S.CloseButton
                          label={""}
                          onClick={() => id && handlePopUp(true, id)}
                        >
                          <Typography
                            $fontSize={"12px"}
                            $color={rgba(Theme.colors.white, 0.8)}
                          >
                            Отменить
                          </Typography>
                          <SvgIcon>
                            <CloseSvg />
                          </SvgIcon>
                        </S.CloseButton>
                      ) : (
                        <></>
                      )}
                    </S.Header>

                    <S.ContentRow>
                      <S.Names>
                        <Typography
                          $fontSize={"14px"}
                          $color={rgba(Theme.colors.white, 0.6)}
                        >
                          Сумма:
                        </Typography>
                        <Typography $color={rgba(Theme.colors.white, 0.8)}>
                          {amount}
                        </Typography>
                      </S.Names>
                      <S.Names>
                        <Typography
                          $fontSize={"14px"}
                          $color={rgba(Theme.colors.white, 0.6)}
                        >
                          Цена:
                        </Typography>
                        <Typography $color={rgba(Theme.colors.white, 0.8)}>
                          {Number(price).toFixed(2)}
                        </Typography>
                      </S.Names>
                      <S.Names>
                        <Typography
                          $fontSize={"14px"}
                          $color={rgba(Theme.colors.white, 0.6)}
                        >
                          Тип сделки:
                        </Typography>
                        <Typography $color={rgba(Theme.colors.white, 0.8)}>
                          {orderType}
                        </Typography>
                      </S.Names>
                      <S.Names>
                        <Typography
                          $fontSize={"14px"}
                          $color={rgba(Theme.colors.white, 0.6)}
                        >
                          Категория:
                        </Typography>
                        <Typography $color={rgba(Theme.colors.white, 0.8)}>
                          {orderCategory}
                        </Typography>
                      </S.Names>
                      <S.Names>
                        <Typography
                          $fontSize={"14px"}
                          $color={rgba(Theme.colors.white, 0.6)}
                        >
                          Статус:
                        </Typography>
                        <Typography $color={rgba(Theme.colors.white, 0.8)}>
                          {orderStatus}
                        </Typography>
                      </S.Names>
                      <S.Names>
                        <Typography
                          $fontSize={"14px"}
                          $color={rgba(Theme.colors.white, 0.6)}
                        >
                          Дата:
                        </Typography>
                        <Typography $color={rgba(Theme.colors.white, 0.8)}>
                          {date.getDay()}/{date.getMonth()}/{date.getFullYear()}{" "}
                          {date.getHours()}:{date.getMinutes()}:
                          {date.getSeconds()}
                        </Typography>
                      </S.Names>
                    </S.ContentRow>
                  </S.Row>
                );
              },
            )
          ) : (
            <Typography
              $color={rgba(Theme.colors.white, 0.6)}
              $fontSize={"24px"}
              $margin={"64px 0 0 0"}
            >
              Список сделок пуст
            </Typography>
          )}
        </S.RowsWrapper>
      ) : (
        <S.AlertMessage>
          <SvgIcon $fill={Theme.colors.orange}>
            <AlertSvg />
          </SvgIcon>

          <Typography $fontSize="14px">
            <S.CustomLink href={"/logIn"}>Войдите</S.CustomLink> или{" "}
            <S.CustomLink href={"/register"}>Зарегестрируйтесь</S.CustomLink>{" "}
            чтобы видеть сделки
          </Typography>
        </S.AlertMessage>
      )}

      <S.CustomButton
        label={"Вернутся к торговле"}
        $variant={"active"}
        onClick={() => router.push("/assets")}
      />
    </MainWrapper>
  );
};

export default Deals;
