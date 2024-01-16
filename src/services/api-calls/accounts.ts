import { ResultWithPagination } from './../../types/index';
import axios from "axios";
import {
  GetAccount,
  CreateAccount,
} from "@/../my-wallet-shared-types/shared-types";

export const fetchAccounts = async (token: string, page: number = 1, perPage: number = 10): Promise<ResultWithPagination<GetAccount>> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.get<ResultWithPagination<GetAccount>>(
    `${url}/api/account/user-accounts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        limit: perPage
      }
    }
  );
  return response.data;
};

export const createAccount = async (
  token: string,
  params: CreateAccount
): Promise<unknown> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.post(`${url}/api/account`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAccount = async (
    token: string,
    accountId: string
  ): Promise<unknown> => {
    const url = import.meta.env.VITE_API_SERVER_URL;
    const response = await axios.delete(`${url}/api/account/delete/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
