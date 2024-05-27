import { DOMAttributes } from "react";

export type StyledProps = {
  $fill?: string;
};

export type Props = DOMAttributes<HTMLDivElement> & StyledProps;
