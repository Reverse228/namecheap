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

  const { currentUser, router } = useMainWrapper();

  return (
    <S.Wrapper $addMenu={Boolean(addMenu)} {...restProps}>
      {addHeader && (
        <S.TopLine>
          {currentUser && typeof currentUser === "object" ? (
            <S.CurrentBalance>
              <Typography
                $fontSize="14px"
                $color={rgba(Theme.colors.white, 0.6)}
              >
                Доступно:{" "}
              </Typography>
              <Typography>{currentUser.depositWallet ?? "0.00"} USD</Typography>
            </S.CurrentBalance>
          ) : (
            <S.NoUserLogIn>
              <Button label="Войти" onClick={() => router.push("/logIn")} />
              <Button
                label="Зарегестрироваться"
                $variant="active"
                onClick={() => router.push("/register")}
              />
            </S.NoUserLogIn>
          )}
          <Button label="Пополнить баланс" $variant="active" />
        </S.TopLine>
      )}
      {children} {addMenu && <Menu active={addMenu.active} />}
    </S.Wrapper>
  );
};

export default MainWrapper;
