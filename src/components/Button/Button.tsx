import { FC } from "react";

import * as S from "./styled";
import { Props } from "./types";

const Button: FC<Props> = (props) => {
  const {
    label,
    $variant = "simple",
    disable,
    onClick,
    children,
    ...restProps
  } = props;

  return (
    <S.Wrapper
      $variant={$variant}
      onClick={disable ? undefined : onClick}
      $disabled={disable}
      {...restProps}
    >
      {label}
      {children}
    </S.Wrapper>
  );
};

export default Button;
