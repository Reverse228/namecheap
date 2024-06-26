import styled from "@emotion/styled";
import { StyledProps } from "./types";
import { css } from "@emotion/react";
import { Theme } from "@utils";

export const Wrapper = styled.div<StyledProps>`
  ${({ $fill, $margin }) => css`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

    ${$margin &&
    css`
      margin: ${$margin};
    `}

    svg,
    path {
      fill: ${$fill ?? Theme.colors.white};
    }
  `}
`;
