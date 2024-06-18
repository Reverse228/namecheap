import styled from "@emotion/styled";
import { StyledProps } from "./types";
import { css } from "@emotion/react";

export const Text = styled.p<StyledProps>`
  ${({ $fontSize, $color, $margin }) => css`
    margin: ${$margin ?? 0};

    ${$fontSize &&
    css`
      font-size: ${$fontSize};
    `}

    ${$color &&
    css`
      color: ${$color};
    `}
  `}
`;
