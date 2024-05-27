import styled from "@emotion/styled";
import { StyledProps } from "./types";
import { css } from "@emotion/react";
import { Theme } from "@utils";

export const Wrapper = styled.div<StyledProps>`
  ${({ $alignItems, $gap, $addMenu }) => css`
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    padding: 36px 12px;
    position: relative;
    color: ${Theme.colors.white};
    margin: ${$addMenu ? "0 0 92px 0" : "0"};

    ${$gap &&
    css`
      gap: ${$gap};
    `};

    ${$alignItems &&
    css`
      align-items: ${$alignItems};
    `};
  `}
`;

export const TopLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CurrentBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
