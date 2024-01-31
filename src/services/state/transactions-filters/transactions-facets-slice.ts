import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionFacets {
  currency: { key: string; count: number }[];
  category: { key: string; count: number }[];
  account: { id: string; key: string; count: number }[];
}

const initialState: TransactionFacets = {
  currency: [],
  category: [],
  account: [],
};

const transactionsFacetsSlice = createSlice({
  name: "transactionsFacets",
  initialState,
  reducers: {
    setCurrencyFacets: (
      state,
      action: PayloadAction<{ key: string; count: number }[]>
    ) => {
      state.currency = action.payload;
    },
    setCategoryFacets: (
      state,
      action: PayloadAction<{ key: string; count: number }[]>
    ) => {
      state.category = action.payload;
    },
    setAccountFacets: (
      state,
      action: PayloadAction<{ id: string; key: string; count: number }[]>
    ) => {
      state.account = action.payload;
    },
  },
});

export const { setCurrencyFacets, setCategoryFacets, setAccountFacets } =
  transactionsFacetsSlice.actions;

export default transactionsFacetsSlice.reducer;
