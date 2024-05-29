import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import { StyledProps } from "./types";
import { css } from "@emotion/react";

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

      input {
        border: 1px solid ${Theme.colors.red};
      }
    `}
`;

export const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${rgba(Theme.colors.white, 0.8)};
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  background: ${Theme.colors.paledBlue};
  transition: 0.2s;
  font-size: 16px;
  border-radius: 4px;
  border: 0;
  border: 1px solid transparent;
  color: ${rgba(Theme.colors.white, 0.6)};

  &:hover {
    background: ${Theme.colors.paledBlueHover};
  }
`;
