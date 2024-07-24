import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { Theme } from "@utils";

const bounce = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-6px);
    }
    100% {
        transform: translateY(0);
    }
`;

export const Wrapper = styled.div<{ $height?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height ?? "fit-content"};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50px;
`;

export const Dot = styled.div<{ $color?: string }>`
  ${({ $color }) => css`
    width: 10px;
    height: 10px;
    background-color: ${$color ?? Theme.colors.white};
    border-radius: 50%;
    animation: ${bounce} 1.5s infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  `}
`;
