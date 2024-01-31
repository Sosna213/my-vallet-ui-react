import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionPagination {
  currentPage: number;
  maxPage: number;
}

const initialState: TransactionPagination = {
  currentPage: 1,
  maxPage: 1,
};

const transactionsPaginationSlice = createSlice({
  name: "transactionsPagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMaxPage: (state, action: PayloadAction<number>) => {
      state.maxPage = action.payload;
    },
  },
});

export const { setCurrentPage, setMaxPage } =
transactionsPaginationSlice.actions;

export default transactionsPaginationSlice.reducer;
