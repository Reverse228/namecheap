import * as S from "./styled";
import { FC } from "react";

const Loader: FC<{ $color?: string; $height?: string }> = (props) => {
  const { $color, $height } = props;

  return (
    <S.Wrapper $height={$height}>
      <S.Content>
        <S.Dot $color={$color} />
        <S.Dot $color={$color} />
        <S.Dot $color={$color} />
      </S.Content>
    </S.Wrapper>
  );
};

export default Loader;
