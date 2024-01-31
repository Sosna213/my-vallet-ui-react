import { configureStore } from "@reduxjs/toolkit";
import transactionFilterReducer from "./transactions/transactions-filter-slice";
import transactionFacetsReducer from "./transactions/transactions-facets-slice";
import transactionPaginationReducer from "./transactions/transactions-paginator-slice";
import accountsPaginationReducer from "./accounts/accounts-paginator-slice";

export const store = configureStore({
  reducer: {
    transactionsFilter: transactionFilterReducer,
    transactionsFacets: transactionFacetsReducer,
    transactionsPagination: transactionPaginationReducer,
    accountsPagination: accountsPaginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;