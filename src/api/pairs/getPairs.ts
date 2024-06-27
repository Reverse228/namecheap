import { useApiCalls } from "@utils/hooks";

export type GetPairsApi = {
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  lastPrice: number;
}[];

export const GetPairs = () => {
  const { data, isLoading } = useApiCalls<GetPairsApi, GetPairsApi>(
    "pairs",
    undefined,
    undefined,
    true,
  );

  return { data, isLoading };
};
