import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "@utils";

export const GetWallet = async () => {
  const token = Cookies.get("token");

  let config = {
    method: "get",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    url: `${API_URL}/wallet`,
  };

  return await axios(config)
    .then(({ data }) => data)
    .catch((e) => null);
};
