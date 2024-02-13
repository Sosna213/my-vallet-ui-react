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
import { TransactionFacets } from "../state/transactions/transactions-facets-slice";
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


const testData: CreateTransactionDTO[] = [
  {
    name: "Rent Payment",
    amount: -1200,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HOUSING,
    date: new Date("2024-01-15T10:30:00.000Z"),
  },
  {
    name: "Electricity Bill Payment",
    amount: -80,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2024-01-10T15:45:00.000Z"),
  },
  {
    name: "Bus Fare",
    amount: -50,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2024-01-05T12:20:00.000Z"),
  },
  {
    name: "Groceries Purchase",
    amount: -60,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2024-01-12T14:00:00.000Z"),
  },
  {
    name: "Medical Expenses",
    amount: -30,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.HEALTH,
    date: new Date("2024-01-08T11:40:00.000Z"),
  },
  {
    name: "Movie Tickets",
    amount: -25,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2024-01-14T20:00:00.000Z"),
  },
  {
    name: "Shampoo Purchase",
    amount: -8,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2024-01-11T09:30:00.000Z"),
  },
  {
    name: "Debt Repayment",
    amount: -100,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2024-01-09T17:00:00.000Z"),
  },
  {
    name: "Course Fee Payment",
    amount: -200,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2024-01-07T13:45:00.000Z"),
  },
  {
    name: "Property Tax Payment",
    amount: -150,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.TAXES,
    date: new Date("2024-01-03T18:20:00.000Z"),
  },
  {
    name: "Miscellaneous Expense",
    amount: -15,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2024-01-16T22:10:00.000Z"),
  },
  {
    name: "Income",
    amount: 2000,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.OTHERS,
    date: new Date("2024-01-18T09:00:00.000Z"),
  },
  {
    name: "Water Bill",
    amount: -40,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-12-20T08:45:00.000Z"),
  },
  {
    name: "Car Maintenance",
    amount: -120,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-12-15T14:30:00.000Z"),
  },
  {
    name: "Dinner Out",
    amount: -70,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-12-10T20:00:00.000Z"),
  },
  {
    name: "Gym Membership",
    amount: -50,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-12-25T09:15:00.000Z"),
  },
  {
    name: "Concert Tickets",
    amount: -90,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-12-12T18:30:00.000Z"),
  },
  {
    name: "Toiletries",
    amount: -15,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-12-08T11:00:00.000Z"),
  },
  {
    name: "Loan Repayment",
    amount: -150,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2023-12-19T16:45:00.000Z"),
  },
  {
    name: "Art Class Fee",
    amount: -180,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2023-12-05T13:30:00.000Z"),
  },
  {
    name: "City Tax",
    amount: -80,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TAXES,
    date: new Date("2023-12-29T17:20:00.000Z"),
  },
  {
    name: "Gift Purchase",
    amount: -25,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-12-14T22:10:00.000Z"),
  },
  {
    name: "Freelance Income",
    amount: 500,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-12-18T09:00:00.000Z"),
  },
  {
    name: "Water Bill",
    amount: -30,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-12-20T12:45:00.000Z"),
  },
  {
    name: "Taxi Ride",
    amount: -15,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-12-15T08:30:00.000Z"),
  },
  {
    name: "Dinner Out",
    amount: -75,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-12-10T19:00:00.000Z"),
  },
  {
    name: "Gym Membership",
    amount: -50,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-12-28T15:15:00.000Z"),
  },
  {
    name: "Concert Tickets",
    amount: -100,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-12-25T21:30:00.000Z"),
  },
  {
    name: "Toiletries",
    amount: -20,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-12-05T10:00:00.000Z"),
  },
  {
    name: "Loan Repayment",
    amount: -150,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2023-12-18T16:45:00.000Z"),
  },
  {
    name: "Art Class Fee",
    amount: -120,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2023-12-12T14:15:00.000Z"),
  },
  {
    name: "City Tax",
    amount: -40,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TAXES,
    date: new Date("2023-12-08T11:30:00.000Z"),
  },
  {
    name: "Home Decor",
    amount: -85,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-12-22T20:20:00.000Z"),
  },
  {
    name: "Freelance Income",
    amount: 300,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-12-29T09:30:00.000Z"),
  },
  {
    name: "Home Insurance",
    amount: -180,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.HOUSING,
    date: new Date("2023-12-02T18:50:00.000Z"),
  },
  {
    name: "Car Maintenance",
    amount: -60,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-12-14T22:10:00.000Z"),
  },
  {
    name: "Online Course",
    amount: -90,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2023-12-17T13:15:00.000Z"),
  },
  {
    name: "Gift Shopping",
    amount: -40,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-12-07T19:40:00.000Z"),
  },
  {
    name: "Cash Withdrawal",
    amount: -25,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-12-30T08:00:00.000Z"),
  },
  {
    name: "Holiday Travel",
    amount: -200,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-12-23T16:30:00.000Z"),
  },
  {
    name: "Pet Supplies",
    amount: -35,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.HOUSING,
    date: new Date("2023-12-11T11:00:00.000Z"),
  },
  {
    name: "Investment",
    amount: 250,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-12-27T14:45:00.000Z"),
  },
  {
    name: "New Year's Eve Party",
    amount: -120,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-12-31T21:00:00.000Z"),
  },
{
    name: "Rent Payment",
    amount: -1100,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HOUSING,
    date: new Date("2023-09-15T10:30:00.000Z"),
  },
  {
    name: "Electricity Bill Payment",
    amount: -70,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-09-10T15:45:00.000Z"),
  },
  {
    name: "Bus Fare",
    amount: -40,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-09-05T12:20:00.000Z"),
  },
  {
    name: "Groceries Purchase",
    amount: -55,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-09-12T14:00:00.000Z"),
  },
  {
    name: "Medical Expenses",
    amount: -25,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-09-08T11:40:00.000Z"),
  },
  {
    name: "Movie Tickets",
    amount: -20,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-09-14T20:00:00.000Z"),
  },
  {
    name: "Shampoo Purchase",
    amount: -7,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-09-11T09:30:00.000Z"),
  },
  {
    name: "Debt Repayment",
    amount: -90,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2023-09-09T17:00:00.000Z"),
  },
  {
    name: "Course Fee Payment",
    amount: -180,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2023-09-07T13:45:00.000Z"),
  },
  {
    name: "Property Tax Payment",
    amount: -120,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.TAXES,
    date: new Date("2023-09-03T18:20:00.000Z"),
  },
  {
    name: "Miscellaneous Expense",
    amount: -10,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-09-16T22:10:00.000Z"),
  },
  {
    name: "Income",
    amount: 1800,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-09-18T09:00:00.000Z"),
  },
  {
    name: "Water Bill",
    amount: -35,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-09-20T08:45:00.000Z"),
  },
  {
    name: "Car Maintenance",
    amount: -100,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-09-15T14:30:00.000Z"),
  },
  {
    name: "Dinner Out",
    amount: -60,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-09-10T20:00:00.000Z"),
  },
  {
    name: "Gym Membership",
    amount: -40,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-09-25T09:15:00.000Z"),
  },
  {
    name: "Concert Tickets",
    amount: -80,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-09-12T18:30:00.000Z"),
  },
  {
    name: "Toiletries",
    amount: -12,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-09-08T11:00:00.000Z"),
  },
  {
    name: "Rent Payment",
    amount: -1150,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HOUSING,
    date: new Date("2023-10-15T10:30:00.000Z"),
  },
  {
    name: "Electricity Bill Payment",
    amount: -75,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-10-10T15:45:00.000Z"),
  },
  {
    name: "Bus Fare",
    amount: -45,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-10-05T12:20:00.000Z"),
  },
  {
    name: "Groceries Purchase",
    amount: -50,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-10-12T14:00:00.000Z"),
  },
  {
    name: "Medical Expenses",
    amount: -20,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-10-08T11:40:00.000Z"),
  },
  {
    name: "Movie Tickets",
    amount: -15,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-10-14T20:00:00.000Z"),
  },
  {
    name: "Shampoo Purchase",
    amount: -6,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-10-11T09:30:00.000Z"),
  },
  {
    name: "Debt Repayment",
    amount: -80,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2023-10-09T17:00:00.000Z"),
  },
  {
    name: "Course Fee Payment",
    amount: -160,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2023-10-07T13:45:00.000Z"),
  },
  {
    name: "Property Tax Payment",
    amount: -130,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.TAXES,
    date: new Date("2023-10-03T18:20:00.000Z"),
  },
  {
    name: "Miscellaneous Expense",
    amount: -12,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-10-16T22:10:00.000Z"),
  },
  {
    name: "Income",
    amount: 1700,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-10-18T09:00:00.000Z"),
  },
  {
    name: "Water Bill",
    amount: -30,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-10-20T08:45:00.000Z"),
  },
  {
    name: "Car Maintenance",
    amount: -90,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-10-15T14:30:00.000Z"),
  },
  {
    name: "Dinner Out",
    amount: -55,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-10-10T20:00:00.000Z"),
  },
  {
    name: "Gym Membership",
    amount: -35,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-10-25T09:15:00.000Z"),
  },
  {
    name: "Concert Tickets",
    amount: -70,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-10-12T18:30:00.000Z"),
  },
  {
    name: "Toiletries",
    amount: -10,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-10-08T11:00:00.000Z"),
  },
  {
    name: "Rent Payment",
    amount: -1100,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HOUSING,
    date: new Date("2023-11-15T10:30:00.000Z"),
  },
  {
    name: "Electricity Bill Payment",
    amount: -70,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2023-11-10T15:45:00.000Z"),
  },
  {
    name: "Bus Fare",
    amount: -40,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2023-11-05T12:20:00.000Z"),
  },
  {
    name: "Groceries Purchase",
    amount: -50,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2023-11-12T14:00:00.000Z"),
  },
  {
    name: "Medical Expenses",
    amount: -25,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.HEALTH,
    date: new Date("2023-11-08T11:40:00.000Z"),
  },
  {
    name: "Movie Tickets",
    amount: -20,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2023-11-14T20:00:00.000Z"),
  },
  {
    name: "Shampoo Purchase",
    amount: -7,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2023-11-11T09:30:00.000Z"),
  },
  {
    name: "Debt Repayment",
    amount: -90,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2023-11-09T17:00:00.000Z"),
  },
  {
    name: "Course Fee Payment",
    amount: -180,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2023-11-07T13:45:00.000Z"),
  },
  {
    name: "Property Tax Payment",
    amount: -120,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.TAXES,
    date: new Date("2023-11-03T18:20:00.000Z"),
  },
  {
    name: "Miscellaneous Expense",
    amount: -10,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2023-11-16T22:10:00.000Z"),
  },
  {
    name: "Income",
    amount: 2200,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.OTHERS,
    date: new Date("2023-11-18T09:00:00.000Z"),
  },
    {
    name: "Rent Payment",
    amount: -1100,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.HOUSING,
    date: new Date("2024-02-01T10:30:00.000Z"),
  },
  {
    name: "Electricity Bill Payment",
    amount: -70,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.UTILITIES,
    date: new Date("2024-02-10T15:45:00.000Z"),
  },
  {
    name: "Bus Fare",
    amount: -40,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.TRANSPORTATION,
    date: new Date("2024-02-05T12:20:00.000Z"),
  },
  {
    name: "Groceries Purchase",
    amount: -50,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.FOOD_AND_DRINKS,
    date: new Date("2024-02-12T14:00:00.000Z"),
  },
  {
    name: "Medical Expenses",
    amount: -25,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.HEALTH,
    date: new Date("2024-02-08T11:40:00.000Z"),
  },
  {
    name: "Movie Tickets",
    amount: -20,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.ENTERTAINMENT,
    date: new Date("2024-02-11T20:00:00.000Z"),
  },
  {
    name: "Shampoo Purchase",
    amount: -7,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.PERSONAL_CARE,
    date: new Date("2024-02-11T09:30:00.000Z"),
  },
  {
    name: "Debt Repayment",
    amount: -90,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.DEBT_REPAYMENT,
    date: new Date("2024-02-09T17:00:00.000Z"),
  },
  {
    name: "Course Fee Payment",
    amount: -180,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.EDUCATION,
    date: new Date("2024-02-07T13:45:00.000Z"),
  },
  {
    name: "Property Tax Payment",
    amount: -120,
    accountId: "1dd632c7-83e0-4531-8497-4fc3fc222da1",
    category: TransactionsCategories.TAXES,
    date: new Date("2024-02-03T18:20:00.000Z"),
  },
  {
    name: "Miscellaneous Expense",
    amount: -10,
    accountId: "925a5651-f43d-43fe-983f-62de24297402",
    category: TransactionsCategories.MISCELLANEOUS,
    date: new Date("2024-02-10T22:10:00.000Z"),
  },
  {
    name: "Income",
    amount: 2200,
    accountId: "4293f3b2-379d-49d0-afa8-01038d0e2098",
    category: TransactionsCategories.OTHERS,
    date: new Date("2024-02-12T09:00:00.000Z"),
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