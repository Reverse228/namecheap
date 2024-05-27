export type StyledProps = {
  $active?: boolean;
};

export type Props = StyledProps & {
  active?: "/assets" | "/trade" | false;
};
