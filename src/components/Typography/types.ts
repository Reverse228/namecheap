import { ReactNode } from "react";

export type StyledProps = {
  $fontSize?: string;
  $color?: string;
  $margin?: string;
};

export type Props = StyledProps & {
  children: ReactNode;
};
