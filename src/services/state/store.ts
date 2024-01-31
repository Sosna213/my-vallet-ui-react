import { configureStore } from "@reduxjs/toolkit";
import transactionFilterReducer from "./transactions-filters/transactions-filter-slice";
import transactionFacetsReducer from "./transactions-filters/transactions-facets-slice";

export const store = configureStore({
  reducer: {
    transactionsFilter: transactionFilterReducer,
    transactionsFacets: transactionFacetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
