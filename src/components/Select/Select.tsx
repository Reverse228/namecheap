import { FC } from "react";
import { Props } from "@components/Select/types";

import * as S from "./styled";

const Select: FC<Props> = (props) => {
  const { label, required, $error, data, ...restProps } = props;

  return (
    <S.Wrapper>
      <S.Label>
        {label}
        {required && " *"}
      </S.Label>
      <S.Select name={"select"} {...restProps}>
        {data?.map((item) => <option key={item}>{item}</option>)}
      </S.Select>
    </S.Wrapper>
  );
};

export default Select;
