import { InputHTMLAttributes } from "react";

export type StyledProps = {
  $error?: boolean;
};

export type Props = StyledProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    required?: boolean;
  };
