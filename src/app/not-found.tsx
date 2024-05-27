"use client";

import styled from "@emotion/styled";
import MainWrapper from "@src/components/MainWrapper/MainWrapper";
import Typography from "@src/components/Typography/Typography";
import { Theme } from "@utils";
import { rgba } from "emotion-rgba";
import Link from "next/link";

const CustomLink = styled(Link)`
  color: ${rgba(Theme.colors.white, 0.8)};
  transition: 0.2s;
  text-decoration: underline;

  &:hover {
    color: ${rgba(Theme.colors.white, 1)};
  }
`;

const NotFound = () => {
  return (
    <MainWrapper $gap="24px" $alignItems="center">
      <Typography>Данная страница не существует</Typography>
      <CustomLink href={"/assets"}>Вернутся к активам</CustomLink>
    </MainWrapper>
  );
};

export default NotFound;
