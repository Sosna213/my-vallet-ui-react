import {
  ResultWithPagination,
  TransactionsExpensesByMonth,
  TransactionsExpensesGroupedByCategoryAndAcounts,
} from "@/types";
import axios from "axios";
import {
  CreateTransactionDTO,
  GetTransactionDTO,
  TransactionsChartFilters,
  TransactionsFilters,
} from "my-wallet-shared-types/shared-types";
import { TransactionFacets } from "../state/transactions-filters/transactions-facets-slice";

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
): Promise<ResultWithPagination<GetTransactionDTO, TransactionFacets>> => {
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

export const fetchTransactionsExpensesGroupedByCategories = async (
  token: string,
  params?: TransactionsChartFilters
): Promise<TransactionsExpensesGroupedByCategoryAndAcounts> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.get(
    `${url}/api/transaction/expenses-grouped-by-categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...params,
      },
    }
  );

  return response.data;
};



export const fetchTransactionsExpensesGroupedByMonthsAndAmount = async (
  token: string,
  params?: TransactionsChartFilters
): Promise<TransactionsExpensesByMonth> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.get(
    `${url}/api/transaction/expenses-grouped-by-month-and-amount`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...params,
      },
    }
  );

  return response.data;
};