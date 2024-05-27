import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";

export const Wrapper = styled.div`
  width: 100%;
  background: ${Theme.colors.darkerBlue};
  transition: 0.2s;
  border-radius: 2px;
  padding: 0 10px 0 0;
  border: 1px solid transparent;
  display: flex;
  align-items: center;

  &:hover {
    background: ${Theme.colors.darkerBlueHover};
  }

  svg {
    width: 24px;
    height: auto;
    fill: ${rgba(Theme.colors.white, 0.8)};
    cursor: pointer;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  background: transparent;
  border: 0;
  color: ${rgba(Theme.colors.white, 0.6)};
  font-size: 16px;

  &:focus-visible {
    outline: none;
  }
`;
