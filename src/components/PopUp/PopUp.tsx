import * as S from "./styled";
import Button from "@components/Button/Button";
import SvgIcon from "@components/SvgIcon";
import CloseSvg from "../../../public/svg/CloseSvg";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import { FC } from "react";
import { Props } from "@components/PopUp/types";
import Typography from "@components/Typography/Typography";

const PopUp: FC<Props> = (props) => {
  const { messages, header, bottomButton, appear, closePopUp } = props;

  return (
    appear && (
      <S.Wrapper onClick={closePopUp}>
        <S.ContentWrapper onClick={(event) => event.stopPropagation()}>
          <S.HeaderWrapper>
            <Typography
              $fontSize={"18px"}
              $color={rgba(Theme.colors.white, 0.6)}
            >
              {header}
            </Typography>
            <Button
              label={""}
              $bg={rgba(Theme.colors.red, 0.8)}
              onClick={closePopUp}
              $padding={"8px"}
            >
              <SvgIcon>
                <CloseSvg />
              </SvgIcon>
            </Button>
          </S.HeaderWrapper>
          <S.MessagesWrapper>
            {messages}
            {bottomButton?.label && (
              <Button
                label={bottomButton.label}
                $variant={bottomButton.variant}
                onClick={bottomButton.onClick}
                disable={bottomButton.disable}
                $maxWith
              />
            )}
          </S.MessagesWrapper>
        </S.ContentWrapper>
      </S.Wrapper>
    )
  );
};

export default PopUp;
