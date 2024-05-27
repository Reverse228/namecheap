import { PostUser } from "../../api";
import { FC } from "react";

import * as S from "./styled";
import { Props } from "./types";

const Button: FC<Props> = (props) => {
  const { label, $variant = "simple", disable, onClick, ...restProps } = props;

  return (
    <S.Wrapper
      $variant={$variant}
      onClick={disable ? undefined : onClick}
      $disabled={disable}
      {...restProps}
    >
      {label}
    </S.Wrapper>
  );
};

export default Button;
