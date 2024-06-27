import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

export const Header = styled.header`
  width: 100%;
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

export const TypographyGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const InfoBox = styled.div`
  width: 100%;
  border: 1px solid ${Theme.colors.lightBlue};
  padding: 16px;
  border-radius: 6px;
  background: ${rgba(Theme.colors.lightBlue, 0.2)};
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    color: ${rgba(Theme.colors.white, 0.8)};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  justify-content: center;
  width: 100%;
  margin-top: 26px;
`;
