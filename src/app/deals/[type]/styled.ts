import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "@components/Button/Button";
import { Theme } from "@utils";
import Typography from "@components/Typography/Typography";
import { rgba } from "emotion-rgba";

export const ButtonGroup = styled.div<{ $gap?: string }>`
  ${({ $gap }) => css`
    width: 100%;
    position: relative;
    display: flex;
    gap: ${$gap ?? "12px"};
    padding-bottom: 12px;
    border-bottom: 1px solid ${Theme.colors.darkerBlue};
  `}
`;

export const CustomButton = styled(Button)`
  position: fixed;
  left: 50%;
  top: calc(100vh - 108px);
  transform: translate(-50%, -100%);
`;

export const RowsWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  margin-top: 12px;
`;

export const Row = styled.div`
  width: 100%;
  display: grid;
  gap: 24px;
  padding: 16px;
  border-radius: 6px;
  background: rgb(30, 38, 57);
  background: linear-gradient(
    146deg,
    rgba(30, 38, 57, 1) 0%,
    rgba(13, 35, 87, 0.6) 100%
  );
`;

export const Name = styled(Typography)`
  font-weight: 600;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ContentRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 8px;

  @media only screen and (max-width: 670px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

export const CloseButton = styled(Button)`
  height: fit-content;
  align-self: end;
  justify-self: end;
  padding: 2px;
  border: 1px solid ${rgba(Theme.colors.red, 0.6)};
  background: ${rgba(Theme.colors.red, 0.1)};

  &:hover {
    background: ${rgba(Theme.colors.red, 0.8)};
  }
`;

export const Names = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
