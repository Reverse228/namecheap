import { API_URL } from "@utils";
import axios from "axios";

export const LogInUser = async (email: string, password: string) => {
  const dataSend = {
    email,
    password,
  };

  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, dataSend, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data as { accessToken: string; refreshToken: string };
  } catch (e) {
    return null;
  }
};
