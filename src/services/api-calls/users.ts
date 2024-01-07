import axios from "axios";
import { RegisterUser } from "@/../my-wallet-shared-types/shared-types";

export const checkIsRegistered = async (
  token: string,
): Promise<boolean> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.get<boolean>(`${url}/api/user/is-registered`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const registerUser = async (
  token: string,
  params: RegisterUser
): Promise<unknown> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.post(`${url}/api/user/register`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};