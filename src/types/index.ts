import { FacetValue } from "@/components/shared/data-table/filters/SelectableFilter";

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
  needsAuthentication: boolean;
};

export type ResultWithPagination<TItem, TFacets> = {
  items: TItem[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  facets?: TFacets;
};

export type PaginatorInput = {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
};

export type TransactionsExpensesGroupedByCategoryAndAcounts = {
  transactionsGroupedByCategory: TransactionGroupedByCategory[];
  accounts: FacetValue[];
};

export interface TransactionGroupedByCategory {
  category: string;
  amount: number;
}

export interface TransactionGroupedByMonth {
  year: string;
  month: string;
  amount: number;
}


export type TransactionsExpensesByMonth = {
  incomingTransactionsGroupedByMonth: TransactionGroupedByMonth[],
  outgoingTransactionsGroupedByMonth: TransactionGroupedByMonth[],
  accounts: FacetValue[];
}