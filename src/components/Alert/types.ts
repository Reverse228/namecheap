export type StyledProps = {
  $type: "success" | "alert" | "error";
};

export type Props = {
  type: "success" | "alert" | "error";
  description?: string;
  setState?: (value: string | null) => void;
};
