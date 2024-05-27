import { DOMAttributes } from "react";

export type StyledProps = {
  $variant?: "simple" | "active";
  $maxWith?: boolean;
  $margin?: string;
  $disabled?: boolean;
  $padding?: string;
};

export type Props = StyledProps &
  DOMAttributes<HTMLDivElement> & {
    label: string;
    disable?: boolean;
  };
