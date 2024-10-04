export type MenuVariant =
  | "/assets"
  | "/trade"
  | "/deals"
  | "/profile"
  | "/history"
  | false;

export type AdminPairsActions = "edit" | "delete" | "create" | null;
export type AdminUsersActions = "edit" | "orders" | "balances" | null;
