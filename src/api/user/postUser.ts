import { API_URL } from "@utils";
import axios from "axios";

export const PostUser = async (sendDta: {
  email: string;
  password: string;
  phone: string;
  country: string;
  name: string;
}) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, sendDta, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data as { accessToken: string; refreshToken: string };
  } catch (e) {
    return e;
  }
};
