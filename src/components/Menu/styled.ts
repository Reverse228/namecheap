import styled from "@emotion/styled";
import { Theme } from "@utils";
import { StyledProps } from "./types";
import { css } from "@emotion/react";
import { rgba } from "emotion-rgba";

export const Wrapper = styled.div`
  position: fixed;
  top: 100vh;
  width: 100%;
  left: 50%;
  max-width: 720px;
  transform: translate(-50%, -100%);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  background: ${Theme.colors.darkBlue};
  z-index: 100;
  border-top: 1px solid ${Theme.colors.darkerBlue};
`;

export const Buttons = styled.div<StyledProps>`
  ${({ $active }) => css`
    padding: 12px;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;
    color: ${rgba(Theme.colors.white, 0.6)};
    font-size: 10px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      background: ${rgba(Theme.colors.blackBlueHover, 0.5)};
      color: ${rgba(Theme.colors.white, 0.8)};
    }

    ${$active &&
    css`
      background: ${Theme.colors.blackBlueHover};
      color: ${rgba(Theme.colors.white, 1)};
      pointer-events: none;
    `}
  `}
`;
