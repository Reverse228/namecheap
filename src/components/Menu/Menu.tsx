import { FC } from "react";
import { MenuContent } from "./staticData";
import * as S from "./styled";
import { Props } from "./types";
import { useMenu } from "./hook";
import SvgIcon from "../SvgIcon";

const Menu: FC<Props> = (props) => {
  const { active } = props;

  const {
    handles: { handlePushPage },
  } = useMenu();

  return (
    <S.Wrapper>
      {MenuContent.map(({ name, path, id, Icon }) => (
        <S.Buttons
          key={id}
          $active={active === path}
          onClick={() => handlePushPage(path)}
        >
          <SvgIcon>
            <Icon />
          </SvgIcon>
          {name}
        </S.Buttons>
      ))}
    </S.Wrapper>
  );
};

export default Menu;
