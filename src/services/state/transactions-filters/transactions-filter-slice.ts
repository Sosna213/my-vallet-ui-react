import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TransactionsFilters } from "my-wallet-shared-types/shared-types";

const initialState: TransactionsFilters = {
  transactionName: undefined,
  accountId: undefined,
  category: undefined,
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
        console.log(action.payload);
        
      state.category = action.payload;
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
    setPeriod(
      state,
      action: PayloadAction<{ fromDate: string; toDate: string }>
    ) {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
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
  setEq,
  setGte,
  setLte,
  setPeriod,
  resetFilters,
} = transactionsFilterSlice.actions;

export default transactionsFilterSlice.reducer;
