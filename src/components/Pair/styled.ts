import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import Link from "next/link";

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
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

export const ButtonGroup = styled.div<{ $gap?: string }>`
  ${({ $gap }) => css`
    width: 100%;
    position: relative;
    display: flex;
    gap: ${$gap ?? "12px"};
  `}
`;

export const BuyButtonGroup = styled(ButtonGroup)`
  flex-direction: column;
  margin-bottom: 24px;
  align-items: center;
`;

export const CustomInputWrapper = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  gap: 6px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 10px 0 0;
  gap: 8px;
  align-items: center;
  background: ${Theme.colors.darkerBlue};
  transition: 0.2s;
  border-radius: 4px;

  &:hover {
    background: ${Theme.colors.darkerBlueHover};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 0;
  transition: 0.2s;
  background: transparent;
  outline: none;
  color: ${Theme.colors.white};
`;

export const Button = styled.div<{ type: "sell" | "buy"; $disable?: boolean }>`
  ${({ type, $disable }) => css`
    display: flex;
    width: 100%;
    padding: 18px 24px;
    cursor: pointer;
    border-radius: 6px;
    transition: 0.2s;
    align-items: center;
    justify-content: space-between;
    background: ${type === "buy"
      ? $disable
        ? rgba(Theme.colors.lightGreen, 0.2)
        : Theme.colors.lightGreen
      : $disable
        ? rgba(Theme.colors.orange, 0.2)
        : Theme.colors.orange};

    &:hover {
      background: ${type === "buy"
        ? rgba(Theme.colors.lightGreen, 0.8)
        : rgba(Theme.colors.orange, 0.8)};
    }

    ${$disable &&
    css`
      pointer-events: none;

      p {
        color: ${rgba(Theme.colors.white, 0.6)};
      }

      && {
        svg,
        path {
          fill: ${rgba(Theme.colors.white, 0.4)};
        }
      }
    `}
  `}
`;

export const TextIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CustomLink = styled(Link)`
  color: ${Theme.colors.white};
  text-decoration: underline;
`;

export const NoUser = styled.div`
  width: 100%;
  top: 0px;
  height: 100%;
  border-radius: 4px;
  transform: scale(1.2);
  position: absolute;
  background: ${rgba("#1E2639", 0.4)};
  background: linear-gradient(
    146deg,
    rgba(30, 38, 57, 0.6) 0%,
    rgba(13, 35, 87, 0.6) 100%
  );
  backdrop-filter: blur(4px);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
