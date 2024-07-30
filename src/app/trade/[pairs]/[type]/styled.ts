import styled from "@emotion/styled";
import { Theme } from "@utils";

export const Graph = styled.div`
  width: 100%;
  position: relative;
  min-height: 600px;
  text-align: center;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  top: -92px;

  &:after {
    content: " ";
    width: 100%;
    height: 92px;
    position: fixed;
    left: 0;
    top: 100%;
    transform: translateY(-100%);
    background: ${Theme.colors.darkBlue};
  }
`;
