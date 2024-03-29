import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TransactionsFilters } from "my-wallet-shared-types/shared-types";

const initialState: TransactionsFilters = {
  transactionName: undefined,
  accountId: undefined,
  category: undefined,
  currency: undefined,
  eq: undefined,
  gte: undefined,
  lte: undefined,
  fromDate: undefined,
  toDate: undefined,
};

const transactionsFilterSlice = createSlice({
  name: "transactionsFilter",
  initialState,
  reducers: {
    setTransactionName(state, action: PayloadAction<string>) {
      state.transactionName = action.payload;
    },
    setAccountId(state, action: PayloadAction<string[]>) {
      state.accountId = action.payload;
    },
    setCategory(state, action: PayloadAction<string[]>) {
      state.category = action.payload;
    },
    setCurrency(state, action: PayloadAction<string[]>) {
      state.currency = action.payload;
    },
    setEq(state, action: PayloadAction<number | undefined>) {
      state.eq = action.payload;
    },
    setGte(state, action: PayloadAction<number | undefined>) {
      state.gte = action.payload;
    },
    setLte(state, action: PayloadAction<number | undefined>) {
      state.lte = action.payload;
    },
    setDateFrom(state, action: PayloadAction<string>) {
      state.fromDate = action.payload;
    },
    setDateTo(state, action: PayloadAction<string>) {
      state.toDate = action.payload;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTransactionName,
  setAccountId,
  setCategory,
  setCurrency,
  setEq,
  setGte,
  setLte,
  setDateFrom,
  setDateTo,
  resetFilters,
} = transactionsFilterSlice.actions;

export default transactionsFilterSlice.reducer;
