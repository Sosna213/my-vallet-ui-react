import { ResultWithPagination } from "@/types";
import axios from "axios";
import {
  CreateTransactionDTO,
  GetTransactionDTO,
  TransactionsFilters,
} from "my-wallet-shared-types/shared-types";
import { TransactionFacets } from "../state/transactions-filters/transactions-facets-slice";
import { TransactionsCategories } from "@/utils/enums";

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

const testData: CreateTransactionDTO[] = [
  {
    name: "Rent",
    amount: -1200,
    accountId: "50228d26-4e82-420a-8b57-14ac58f327a9",
    category: TransactionsCategories.HOUSING,
    date: new Date("2024-01-15T10:30:00.000Z"),
  },
  {
    name: "Electricity Bill",
    amount: -80,
    accountId: "a517e46c-3327-4ead-9aab-70d3d205ffa2",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2024-01-10T15:45:00.000Z"),
  },
  {
    name: "Gas Bill",
    amount: -50,
    accountId: "03fa165e-5f8c-4d0c-b957-fdbc555744cb",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2024-01-05T12:20:00.000Z"),
  },
  {
    name: "Bus Fare",
    amount: -10,
    accountId: "13bfa6a8-4cc3-4bbb-ad3f-52ffcfc9946e",
    category: TransactionsCategories.TAXES,
    date: new Date("2024-01-17T08:15:00.000Z"),
  },
  {
    name: "Groceries",
    amount: -60,
    accountId: "a517e46c-3327-4ead-9aab-70d3d205ffa2",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2024-01-12T14:00:00.000Z"),
  },
  {
    name: "Medical Expenses",
    amount: -30,
    accountId: "13bfa6a8-4cc3-4bbb-ad3f-52ffcfc9946e",
    category: TransactionsCategories.HEALTH,
    date: new Date("2024-01-08T11:40:00.000Z"),
  },
  {
    name: "Movie Tickets",
    amount: -25,
    accountId: "50228d26-4e82-420a-8b57-14ac58f327a9",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2024-01-14T20:00:00.000Z"),
  },
  {
    name: "Shampoo",
    amount: -8,
    accountId: "03fa165e-5f8c-4d0c-b957-fdbc555744cb",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2024-01-11T09:30:00.000Z"),
  },
  {
    name: "Repayment",
    amount: -100,
    accountId: "a517e46c-3327-4ead-9aab-70d3d205ffa2",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2024-01-09T17:00:00.000Z"),
  },
  {
    name: "Course Fee",
    amount: -200,
    accountId: "50228d26-4e82-420a-8b57-14ac58f327a9",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2024-01-07T13:45:00.000Z"),
  },
  {
    name: "Property Tax",
    amount: -150,
    accountId: "13bfa6a8-4cc3-4bbb-ad3f-52ffcfc9946e",
    category: TransactionsCategories.TAXES,
    date: new Date("2024-01-03T18:20:00.000Z"),
  },
  {
    name: "Miscellaneous Expense",
    amount: -15,
    accountId: "03fa165e-5f8c-4d0c-b957-fdbc555744cb",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2024-01-16T22:10:00.000Z"),
  },
  {
    name: "Income",
    amount: 2000,
    accountId: "13bfa6a8-4cc3-4bbb-ad3f-52ffcfc9946e",
    category: TransactionsCategories.OTHERS,
    date: new Date("2024-01-18T09:00:00.000Z"),
  },
];

export const createTransactions = async (token: string): Promise<unknown> => {
  const url = import.meta.env.VITE_API_SERVER_URL;
  const response = await axios.post(`${url}/api/transaction/batch`, testData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
