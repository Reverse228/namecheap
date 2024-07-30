import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import { Theme } from "@utils";
import { css, keyframes } from "@emotion/react";

const wrapperAnim = keyframes`
    0% {
        background: ${rgba(Theme.colors.darkBlue, 0)};
        backdrop-filter: blur(0px);
    }
    100% {
        background: ${rgba(Theme.colors.darkBlue, 0.5)};
        backdrop-filter: blur(10px);
    }
`;

const PopUpAppear = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const Wrapper = styled.div<{ $appear?: boolean }>`
  ${({ $appear }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: 0.2s;
    animation-name: ${PopUpAppear};
    animation-duration: 0.2s;

    background: ${$appear
      ? rgba(Theme.colors.darkBlue, 0.5)
      : rgba(Theme.colors.darkBlue, 0)};
    backdrop-filter: blur(${$appear ? "10px" : "0px"});
  `}
`;

export const ContentWrapper = styled.div<{ $appear?: boolean }>`
  ${({ $appear }) => css`
    background: ${Theme.colors.blackBlueHover};
    animation-name: ${PopUpAppear};
    border-radius: 4px;
    display: grid;
    min-width: 420px;
    max-width: 420px;
    z-index: 10;
    transition: 0.2s;
    opacity: ${$appear ? 1 : 0};
    transform: scale(${$appear ? 1 : 0.8});
  `}
`;

export const HeaderWrapper = styled.div`
  padding: 12px 24px;
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
