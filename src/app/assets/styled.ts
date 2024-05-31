import styled from "@emotion/styled";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import Link from "next/link";

export const PairsWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  align-self: center;
`;

export const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
  padding: 20px 36px;
  border-radius: 6px;
  border: 2px solid ${Theme.colors.orange};
  background-color: ${rgba(Theme.colors.orange, 0.03)};
`;

export const CustomLink = styled(Link)`
  color: ${Theme.colors.orange};
  text-decoration: underline;
`;

export const NoData = styled.div`
  width: 100%;
  padding: 120px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
