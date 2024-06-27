import { DOMAttributes } from "react";

export type StyledProps = {
  $fill?: string;
  $margin?: string;
};

export type Props = DOMAttributes<HTMLDivElement> & StyledProps;
