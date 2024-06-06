"use client";

import MainWrapper from "@components/MainWrapper/MainWrapper";

import * as S from "./styled";
import Button from "@components/Button/Button";
import { Theme } from "@utils";
import { useDeals } from "@src/app/deals/[type]/hook";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";
import { Name } from "./styled";
import SvgIcon from "@components/SvgIcon";
import CloseSvg from "../../../../public/svg/CloseSvg";

const Deals = ({ params }: { params: { type: string } }) => {
  const {
    router,
    userData,
    handles: { handleChangeType },
  } = useDeals();

  return (
    <MainWrapper
      addMenu={{
        active: "/deals",
      }}
    >
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

      {typeof userData === "object" && (
        <S.RowsWrapper>
          {userData?.orders.map(
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

              return orderStatus?.toLowerCase() === params?.type ? (
                <S.Row key={id}>
                  <S.Header>
                    <S.Name $fontSize={"18px"}>
                      {pair.baseCurrency} / {pair.quoteCurrency}
                    </S.Name>
                    <S.CloseButton label={""}>
                      <SvgIcon>
                        <CloseSvg />
                      </SvgIcon>
                    </S.CloseButton>
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
              ) : null;
            },
          )}
        </S.RowsWrapper>
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
