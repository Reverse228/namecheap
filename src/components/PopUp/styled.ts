import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${rgba(Theme.colors.darkBlue, 0.3)};
  backdrop-filter: blur(10px);
  z-index: 1;
`;

export const ContentWrapper = styled.div`
  background: ${Theme.colors.paledBlueHover};
  border-radius: 4px;
  display: grid;
  min-width: 420px;
  max-width: 420px;
  z-index: 10;
`;

export const HeaderWrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.colors.darkBlue};
  align-items: center;
`;

export const MessagesWrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
