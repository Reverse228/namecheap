export type Props = {
  disableButtons?: boolean;
  baseCurrency?: string;
  quoteCurrency?: string;
  onCLickSell?: (priceSell?: number, sum?: string) => void;
  onClickBuy?: (priceBuy?: number, sum?: string) => void;
  buy?: {
    path?: string;
  };
};
