import { ReactNode } from "react";

export type StyledProps = {
  $alignItems?: string;
  $gap?: string;
  $addMenu?: boolean;
};

export type Props = StyledProps & {
  children: ReactNode;
  addHeader?: boolean;
  addMenu?: {
    active: "/assets" | "/trade" | "/deals" | "/profile" | "/history" | false;
  };
};
