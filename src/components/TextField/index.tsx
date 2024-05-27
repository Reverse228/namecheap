import { FC } from "react";
import * as S from "./styled";
import { Props } from "./types";

const TextField: FC<Props> = (props) => {
  const { label, required, $error, ...restProps } = props;

  return (
    <S.Wrapper $error={$error}>
      <S.Label>
        {label}
        {required && " *"}
      </S.Label>
      <S.TextField {...restProps} />
    </S.Wrapper>
  );
};

export default TextField;
