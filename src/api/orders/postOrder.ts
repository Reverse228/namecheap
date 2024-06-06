import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@utils";
import Cookies from "js-cookie";

export type SendOrderProps = {
  pair: {
    baseCurrency: string;
    quoteCurrency: string;
  };
  amount: number;
  price: number;
  orderType:
    | "BUY"
    | "SELL"
    | "BUY_LIMIT"
    | "SELL_LIMIT"
    | "BUY_STOP"
    | "SELL_STOP";
  orderCategory: "MARGIN" | "SPOT" | "FUTURES" | "OPTIONS";
  margin: number;
  orderStatus: string;
  timestamp: Date;
};

export const PostOrder = async (data: SendOrderProps) => {
  const token = Cookies.get("token");

  let config: AxiosRequestConfig<SendOrderProps> = {
    method: "post",
    url: `${API_URL}/orders`,
    data: data,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  return await axios(config)
    .then(({ data }) => data.data)
    .catch((e: AxiosError<{ data: string; meta: string; timestamp: Date }>) =>
      e.response && e.response.data && e.response.data.data
        ? e.response.data.data
        : "Error",
    );
};
