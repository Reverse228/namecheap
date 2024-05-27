import { FC, useEffect, useState } from "react";
import * as S from "./styled";
import { Props } from "./types";

const Alert: FC<Props> = (props) => {
  const { type, description } = props;

  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      if (active) {
        setActive(!active);
      }
    }, 5000);
  }, []);

  return (
    active && (
      <S.Wrapper $type={type}>
        <S.AlertTitle $type={type}>{type.toUpperCase()}</S.AlertTitle>
        {description && <S.AlertDesc>{description}</S.AlertDesc>}
      </S.Wrapper>
    )
  );
};

export default Alert;
