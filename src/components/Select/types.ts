import { SelectHTMLAttributes } from "react";

export type StyledProps = {
  $error?: boolean;
};

export type Props = StyledProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    required?: boolean;
    data?: string[];
  };
