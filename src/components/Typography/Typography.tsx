import { FC, ReactNode } from "react";
import * as S from "./styled";
import { Props } from "./types";

const Typography: FC<Props> = (props) => {
  const { children, ...restProps } = props;

  return <S.Text {...restProps}>{children}</S.Text>;
};

export default Typography;
