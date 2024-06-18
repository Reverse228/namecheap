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

  const { userData, router, balance, isLoading, isSuccess } = useMainWrapper();
  return (
    <S.Wrapper $addMenu={Boolean(addMenu)} {...restProps}>
      {addHeader && (
        <S.TopLine>
          {!isLoading &&
            (isSuccess ? (
              <>
                <S.CurrentBalance>
                  <Typography
                    $fontSize="14px"
                    $color={rgba(Theme.colors.white, 0.6)}
                  >
                    Доступно:{" "}
                  </Typography>
                  <Typography>{balance ?? "0.00"}</Typography>
                </S.CurrentBalance>

                <Button
                  label="Пополнить баланс"
                  $variant="active"
                  onClick={() => router.push("/profile/wallet")}
                />
              </>
            ) : (
              <S.NoUserLogIn>
                <Button label="Войти" onClick={() => router.push("/logIn")} />
                <Button
                  label="Зарегестрироваться"
                  $variant="active"
                  onClick={() => router.push("/register")}
                />
              </S.NoUserLogIn>
            ))}
        </S.TopLine>
      )}
      {children} {addMenu && <Menu active={addMenu.active} />}
    </S.Wrapper>
  );
};

export default MainWrapper;
