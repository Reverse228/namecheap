import styled from "@emotion/styled";
import { Theme } from "@utils";
import { Props, StyledProps } from "./types";
import { rgba } from "emotion-rgba";

export const Wrapper = styled.div<StyledProps>`
  position: fixed;
  max-width: 250px;
  width: 100%;
  left: 100%;
  transform: translateX(-100%);
  padding: 12px 24px;
  display: grid;
  gap: 8px;
  background: ${Theme.colors.paledBlueHover};
  border-left: 4px solid
    ${({ $type }) =>
      ($type === "error" && Theme.colors.red) ||
      ($type === "success" && Theme.colors.green)};
`;

export const AlertTitle = styled.h3<StyledProps>`
  margin: 0;
  font-size: 18px;
  color: ${({ $type }) =>
    ($type === "error" && Theme.colors.red) ||
    ($type === "success" && Theme.colors.green)};
`;

export const AlertDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${rgba(Theme.colors.white, 0.8)};
`;
