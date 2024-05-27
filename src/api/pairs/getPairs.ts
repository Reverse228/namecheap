import { API_URL } from "@utils";
import axios from "axios";
import Cookies from "js-cookie";

export type GetPairsApi = {
  baseCurrency: string;
  quoteCurrency: string;
}[];

export const GetPairs = async (setData: (value: GetPairsApi) => void) => {
  try {
    const token = Cookies.get("token");

    await axios
      .get(`${API_URL}/pairs`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }: { data: GetPairsApi }) => setData(data));
  } catch (e) {
    return null;
  }
};
