export type Props = {
  messages?: string;
  header?: string;
  appear?: boolean;
  closePopUp?: () => void;
  bottomButton?: {
    label: string;
    onClick?: () => void;
    variant?: "simple" | "active";
  };
};
