import React, { FC } from "react";
import Button from "@components/Button/Button";
import { useRouter } from "next/navigation";

import { Props } from "./types";
import TextField from "../TextField";
import { useLogInRegister } from "./hook";
import Alert from "../Alert/Alert";
import * as S from "./styled";
import MainWrapper from "../MainWrapper/MainWrapper";

const LogInRegister: FC<Props> = (props) => {
  const { variant } = props;

  const {
    router,
    equalsPass,
    activeRegButton,
    activeLogInButton,
    isSuccess,
    errorLogIn,
    number,
    errorDesc,
    emailErr,
    handles: {
      handleConfirmPass,
      handleEmail,
      handleName,
      handlePass,
      handleSurname,
      handelRegister,
      handleLogIn,
      handleCity,
      handleNumber,
    },
  } = useLogInRegister();

  return (
    <MainWrapper $gap="64px" $alignItems="center">
      {isSuccess && <Alert type="success" />}
      {(equalsPass || emailErr) && (
        <Alert type="error" description={errorDesc ?? "Пароли не совпадают"} />
      )}
      {errorLogIn && (
        <Alert type="error" description="Неправельный логин или пароль" />
      )}

      <S.MainButton>
        <Button
          label="ВОЙТИ"
          onClick={() => router.push("logIn")}
          $variant={variant === "logIn" ? "active" : "simple"}
        />
        <Button
          label="РЕГИСТРАЦИЯ"
          onClick={() => router.push("register")}
          $variant={variant === "register" ? "active" : "simple"}
        />
      </S.MainButton>

      {variant === "register" ? (
        <S.TextFieldForm>
          <TextField
            label="Имя"
            required
            type="text"
            onChange={(e) => handleName(e.target.value)}
          />
          <TextField
            label="Фамилия"
            required
            type="text"
            onChange={(e) => handleSurname(e.target.value)}
          />
          <TextField
            label="Почта"
            required
            $error={emailErr}
            type="email"
            onChange={(e) => handleEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            required
            type="password"
            onChange={(e) => handlePass(e.target.value)}
          />
          <TextField
            label="Подвердите пароль"
            required
            $error={equalsPass}
            type="password"
            onChange={(e) => handleConfirmPass(e.target.value)}
          />
          <TextField
            label="Страна"
            required
            type="text"
            onChange={(e) => handleCity(e.target.value)}
          />
          <TextField
            label="Телефон"
            required
            type="tel"
            value={number}
            onChange={(e) => handleNumber(e.target.value)}
          />
          <Button
            onClick={handelRegister}
            disable={!activeRegButton}
            label="Зарегестрироватся"
            $margin="24px 0 0 0"
            $maxWith
            $variant="active"
          />
        </S.TextFieldForm>
      ) : (
        <S.TextFieldForm>
          <TextField
            label="Почта"
            required
            type="email"
            $error={errorLogIn}
            onChange={(e) => handleEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            required
            type="password"
            $error={errorLogIn}
            onChange={(e) => handlePass(e.target.value)}
          />
          <Button
            label="Войти"
            $margin="24px 0 0 0"
            $maxWith
            $variant="active"
            disable={!activeLogInButton}
            onClick={handleLogIn}
          />
        </S.TextFieldForm>
      )}
    </MainWrapper>
  );
};

export default LogInRegister;
