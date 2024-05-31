import axios from "axios";

export type CryptoCoinBuyPrice = {
  id: string;
  name: string;
  amount: string;
};

export const GetCoinPriceBuy = async (base?: string, quote?: string) => {
  let config = {
    method: "get",
    url: `https://api.coinbase.com/v2/prices/${base}-${quote}/buy`,
  };

  return await axios(config)
    .then(({ data }) => data.data as CryptoCoinBuyPrice)
    .catch(
      (error) =>
        ({
          amount: "-",
          base,
          currency: quote,
        }) as unknown as CryptoCoinBuyPrice,
    );
};
