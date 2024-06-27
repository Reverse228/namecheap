import styled from "@emotion/styled";
import { StyledProps } from "@components/TextField/types";
import { css } from "@emotion/react";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

export const Wrapper = styled.div<StyledProps>`
  width: 100%;
  display: grid;
  gap: 6px;

  ${({ $error }) =>
    $error &&
    css`
      p {
        color: ${Theme.colors.red};
      }

      select {
        border: 1px solid ${Theme.colors.red};
      }
    `}
`;

export const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${rgba(Theme.colors.white, 0.8)};
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  background: ${Theme.colors.paledBlue};
  transition: 0.2s;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: ${rgba(Theme.colors.white, 0.6)};

  &:hover {
    background: ${Theme.colors.paledBlueHover};
  }
`;
