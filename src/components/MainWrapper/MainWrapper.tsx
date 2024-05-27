import { FC } from "react";
import { Props } from "./types";
import * as S from "./styled";
import Menu from "../Menu/Menu";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import { useMainWrapper } from "./hook";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";

const MainWrapper: FC<Props> = (props) => {
  const { children, addMenu, addHeader, ...restProps } = props;

  const { userData } = useMainWrapper();

  return (
    <S.Wrapper $addMenu={Boolean(addMenu)} {...restProps}>
      {addHeader && (
        <S.TopLine>
          <Button label="Пополнить баланс" $variant="active" />
          {userData && (
            <S.CurrentBalance>
              <Typography
                $fontSize="14px"
                $color={rgba(Theme.colors.white, 0.6)}
              >
                Доступно:{" "}
              </Typography>
              <Typography>{userData.depositWallet ?? "0.00"} USD</Typography>
            </S.CurrentBalance>
          )}
        </S.TopLine>
      )}
      {children} {addMenu && <Menu active={addMenu.active} />}
    </S.Wrapper>
  );
};

export default MainWrapper;
