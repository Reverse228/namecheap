import styled from "@emotion/styled";
import { Theme } from "@utils";
import { css } from "@emotion/react";

export const Header = styled.header`
  width: 100%;
  padding: 0 0 24px;
  gap: 8px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid ${Theme.colors.darkerBlue};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: ${Theme.colors.darkerBlue};
  border-radius: 4px;
`;

export const BalanceRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const WalletGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    word-break: break-all;
  }
`;

export const ButtonGroup = styled.div<{ $direction?: string }>`
  ${({ $direction }) => css`
    display: flex;
    gap: 12px;
    width: 100%;
    margin-top: 24px;

    ${$direction &&
    css`
      flex-direction: ${$direction};
    `}
  `}
`;
