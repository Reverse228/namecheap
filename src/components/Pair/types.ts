import { MeUserApi } from "@src/api/user/meUser";

export type Props = {
  disableButtons?: boolean;
  baseCurrency?: string;
  quoteCurrency?: string;
  buy?: {
    path?: string;
  };
};
