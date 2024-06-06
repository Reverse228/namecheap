import styled from "@emotion/styled";
import { Theme } from "@utils";

export const Header = styled.header`
  width: 100%;
  padding: 0 0 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;
