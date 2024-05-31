import { API_URL } from "@utils";
import Cookies from "js-cookie";
import axios from "axios";

export type MeUserApi = {
  id: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  name: string | null;
  role: string | null;
  assetBalances: [
    {
      id: string;
      assetName: string | null;
      balance: number | null;
      frozenBalance: number | null;
      pair: {
        baseCurrency: string | null;
        quoteCurrency: string | null;
      };
      walletAddress: string | null;
    },
  ];
  orders: [
    {
      id: string | null;
      pair: {
        baseCurrency: string | null;
        quoteCurrency: string | null;
      };
      amount: number | null;
      price: number | null;
      orderType: string | null;
      orderCategory: string | null;
      margin: number | null;
      orderStatus: string | null;
      timestamp: string | null;
    },
  ];
  depositWallet: string | null;
};

export const MeUser = async (
  setData?: (data: MeUserApi | string) => void,
  params?: object,
) => {
  try {
    const token = Cookies.get("token");

    await axios
      .get(`${API_URL}/auth/me`, {
        params,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }: { data: MeUserApi }) => setData && setData(data));
  } catch (e: any) {
    setData && setData(e.message);
  }
};
