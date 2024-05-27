import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

export const Wrapper = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  display: grid;
  gap: 16px;
  background: rgb(30, 38, 57);
  background: linear-gradient(
    146deg,
    rgba(30, 38, 57, 1) 0%,
    rgba(13, 35, 87, 1) 100%
  );
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
