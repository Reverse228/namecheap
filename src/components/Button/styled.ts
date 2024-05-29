import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import { StyledProps } from "./types";
import { css } from "@emotion/react";

export const Wrapper = styled.div<StyledProps>`
  ${({ $maxWith, $variant, $disabled, $margin, $padding, $bg }) => css`
    padding: ${$padding ?? `8px 16px`};
    width: ${$maxWith ? "100%" : "fit-content"};
    border-radius: 4px;
    background: ${$bg ??
    ($variant === "simple" ? Theme.colors.blackBlue : Theme.colors.green)};
    color: ${$variant === "simple"
      ? rgba(Theme.colors.white, 0.8)
      : Theme.colors.white};
    transition: 0.2s;
    cursor: ${$disabled ? "default" : "pointer"};
    text-align: center;

    ${$disabled &&
    css`
      opacity: 0.4;
    `}

    ${$margin &&
    css`
      margin: ${$margin};
    `}


  &:hover {
      background: ${$bg ??
      ($variant === "simple"
        ? $disabled
          ? Theme.colors.blackBlue
          : Theme.colors.blackBlueHover
        : $disabled
        ? Theme.colors.green
        : Theme.colors.greenHover)};
      color: ${rgba(Theme.colors.white, 1)};
    }
  `}
`;
