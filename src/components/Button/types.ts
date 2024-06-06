import { DOMAttributes, ReactNode } from "react";

export type StyledProps = {
  $variant?: "simple" | "active";
  $maxWith?: boolean;
  $margin?: string;
  $disabled?: boolean;
  $padding?: string;
  $bg?: string;
};

export type Props = StyledProps &
  DOMAttributes<HTMLDivElement> & {
    label: string;
    disable?: boolean;
    children?: ReactNode;
  };
