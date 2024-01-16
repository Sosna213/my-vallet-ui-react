import { ResultWithPagination } from "@/types";
import axios from "axios";
import {
  CreateTransactionDTO,
  GetTransactionDTO,
  TransactionsFilters,
} from "my-wallet-shared-types/shared-types";

export const createTransaction = async (
  token: string,
  params: CreateTransactionDTO
): Promise<unknown> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.post(`${url}/api/transaction`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchTransactions = async (
  token: string,
  params?: TransactionsFilters,
  page: number = 1,
  perPage: number = 10
): Promise<ResultWithPagination<GetTransactionDTO>> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.get(`${url}/api/transaction/user-transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...params,
      page: page,
      limit: perPage,
    },
  });
  return response.data;
};
