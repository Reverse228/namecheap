import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

export const Graph = styled.div`
  width: 100%;
  position: relative;
  min-height: 600px;
  border-radius: 4px;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

export const Button = styled.div<{ type: "sell" | "buy" }>`
  ${({ type }) => css`
    display: flex;
    width: 100%;
    padding: 18px 24px;
    cursor: pointer;
    border-radius: 6px;
    transition: 0.2s;
    justify-content: space-between;
    background: ${type === "buy"
      ? Theme.colors.lightGreen
      : Theme.colors.orange};

    &:hover {
      background: ${type === "buy"
        ? rgba(Theme.colors.lightGreen, 0.8)
        : rgba(Theme.colors.orange, 0.8)};
    }
  `}
`;

export const TextIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NoUser = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  transform: scale(1.05);
  position: absolute;
  background: ${rgba(Theme.colors.darkBlue, 0.4)};
  backdrop-filter: blur(10px);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
