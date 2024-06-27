import { ReactNode } from "react";

export type Props = {
  messages?: string | ReactNode;
  header?: string;
  appear?: boolean;
  closePopUp?: () => void;
  bottomButton?: {
    label: string;
    onClick?: () => void;
    variant?: "simple" | "active";
    disable?: boolean;
  };
};
