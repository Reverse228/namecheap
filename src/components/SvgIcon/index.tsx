import { FC } from "react";
import { Props } from "./types";

import * as S from "./styled";

const SvgIcon: FC<Props> = (props) => {
  const { children, ...restProps } = props;

  return <S.Wrapper {...restProps}>{children}</S.Wrapper>;
};

export default SvgIcon;
