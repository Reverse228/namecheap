import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

export const NoMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-top: 112px;
`;

export const TableWrapper = styled.div`
  overflow: scroll;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${rgba(Theme.colors.white, 0.2)};
  border-radius: 8px;
  overflow: hidden;
`;

export const HeadCell = styled.th`
  padding: 12px;
  font-weight: 500;
`;

export const Row = styled.tr<{ $color?: boolean }>`
  ${({ $color }) => css`
    ${$color &&
    css`
      background: ${Theme.colors.paledBlue};
    `}

    cursor: default;

    &:hover {
      td {
        color: ${rgba(Theme.colors.white, 1)};
        transform: scale(1.2);
      }
    }
  `}
`;

export const Cell = styled.td`
  padding: 12px 12px;
  transition: 0.2s;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  color: ${rgba(Theme.colors.white, 0.4)};

  &:nth-child(4) {
    min-width: 110px;
  }

  &:nth-child(3) {
    min-width: 90px;
  }
`;
