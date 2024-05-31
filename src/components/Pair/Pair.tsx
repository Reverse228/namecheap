import { FC } from "react";
import { Props } from "./types";
import * as S from "./styled";
import Typography from "../Typography/Typography";
import SellSvg from "../../../public/svg/SellSvg";
import BuySvg from "../../../public/svg/BuySvg";
import SvgIcon from "../SvgIcon";
import { usePair } from "./hook";
import Button from "../Button/Button";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";

const Pair: FC<Props> = (props) => {
  const { baseCurrency, quoteCurrency, disableButtons, buy } = props;

  const {
    router,
    sum,
    price,
    buyPrice,
    sellPrice,
    handles: { handleSum, handlePrice },
  } = usePair(baseCurrency, quoteCurrency);

  return (
    <S.Wrapper>
      <Typography $fontSize="18px">
        {quoteCurrency} / {baseCurrency}
      </Typography>

      {buy?.path && (
        <S.BuyButtonGroup>
          <S.ButtonGroup $gap="8px">
            <Button
              $bg={
                buy?.path === "market-transaction"
                  ? Theme.colors.lightBlue
                  : undefined
              }
              label="Рыночная сделка"
              onClick={() => router.replace("market-transaction")}
              $maxWith
            />
            <Button
              $bg={
                buy?.path === "pending-transaction"
                  ? Theme.colors.lightBlue
                  : undefined
              }
              onClick={() => router.replace("pending-transaction")}
              label="Отложеная сделка"
              $maxWith
            />
          </S.ButtonGroup>
          <S.ButtonGroup $gap="8px">
            {disableButtons && (
              <S.NoUser>
                <Typography
                  $fontSize="12px"
                  $color={rgba(Theme.colors.white, 0.8)}
                >
                  <S.CustomLink href={"/logIn"}>Войдите</S.CustomLink> или{" "}
                  <S.CustomLink href={"/register"}>
                    зарегестрируйтесь
                  </S.CustomLink>
                </Typography>
              </S.NoUser>
            )}
            <S.CustomInputWrapper>
              <Typography
                $fontSize="12px"
                $color={rgba(Theme.colors.white, 0.6)}
              >
                Инвестировать
              </Typography>
              <S.InputWrapper>
                <S.Input
                  value={sum}
                  onFocus={() => sum === "0" && handleSum("")}
                  onBlur={() => sum === "" && handleSum("0")}
                  onChange={(e) => handleSum(e.target.value)}
                />
                <Typography>USD</Typography>
              </S.InputWrapper>
            </S.CustomInputWrapper>
            {buy?.path === "pending-transaction" && (
              <S.CustomInputWrapper>
                <Typography
                  $fontSize="12px"
                  $color={rgba(Theme.colors.white, 0.6)}
                >
                  Цена сделки
                </Typography>
                <S.InputWrapper>
                  <S.Input
                    value={price}
                    onFocus={() => price === "0" && handlePrice("")}
                    onBlur={() => price === "" && handlePrice("0")}
                    onChange={(e) => handlePrice(e.target.value)}
                  />
                </S.InputWrapper>
              </S.CustomInputWrapper>
            )}
          </S.ButtonGroup>
        </S.BuyButtonGroup>
      )}

      <S.ButtonGroup>
        <S.Button
          $disable={
            disableButtons ||
            sellPrice?.amount === "-" ||
            (buy && sum === "0") ||
            sum === ""
          }
          type="sell"
          onClick={() =>
            !disableButtons &&
            router.push(
              `/trade/${quoteCurrency}-${baseCurrency}/market-transaction`,
            )
          }
        >
          <S.TextIcons>
            <SvgIcon>
              <SellSvg />
            </SvgIcon>
            <Typography>Продать </Typography>
          </S.TextIcons>
          {sellPrice && (
            <Typography $fontSize={"14px"}>
              {sellPrice.amount !== "-"
                ? `${Number(sellPrice.amount).toFixed(2)} USD`
                : "-"}
            </Typography>
          )}
        </S.Button>
        <S.Button
          $disable={
            disableButtons ||
            buyPrice?.amount === "-" ||
            (buy && sum === "0") ||
            sum === ""
          }
          type="buy"
          onClick={() =>
            !disableButtons &&
            router.push(
              `/trade/${quoteCurrency}-${baseCurrency}/market-transaction`,
            )
          }
        >
          <S.TextIcons>
            <SvgIcon>
              <BuySvg />
            </SvgIcon>
            <Typography>Купить</Typography>
          </S.TextIcons>
          {buyPrice && (
            <Typography $fontSize={"14px"}>
              {buyPrice.amount !== "-"
                ? `${Number(buyPrice.amount).toFixed(2)} USD`
                : "-"}
            </Typography>
          )}
        </S.Button>
      </S.ButtonGroup>
    </S.Wrapper>
  );
};

export default Pair;
