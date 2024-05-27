import { FC } from "react";
import { Props } from "./types";
import * as S from "./styled";
import Typography from "../Typography/Typography";
import SellSvg from "../../../public/svg/SellSvg";
import BuySvg from "../../../public/svg/BuySvg";
import SvgIcon from "../SvgIcon";
import { usePair } from "./hook";

const Pair: FC<Props> = (props) => {
  const { baseCurrency, quoteCurrency, disableButtons } = props;

  const { router } = usePair();

  return (
    <S.Wrapper>
      <Typography $fontSize="18px">
        {quoteCurrency} / {baseCurrency}
      </Typography>

      <S.ButtonGroup>
        <S.Button
          $disable={disableButtons}
          type="sell"
          onClick={() =>
            !disableButtons &&
            router.push(`/trade/${quoteCurrency}-${baseCurrency}`)
          }
        >
          <S.TextIcons>
            <SvgIcon>
              <SellSvg />
            </SvgIcon>
            <Typography>Продать</Typography>
          </S.TextIcons>
        </S.Button>
        <S.Button
          $disable={disableButtons}
          type="buy"
          onClick={() =>
            !disableButtons &&
            router.push(`/trade/${quoteCurrency}-${baseCurrency}`)
          }
        >
          <S.TextIcons>
            <SvgIcon>
              <BuySvg />
            </SvgIcon>
            <Typography>Купить</Typography>
          </S.TextIcons>
        </S.Button>
      </S.ButtonGroup>
    </S.Wrapper>
  );
};

export default Pair;
