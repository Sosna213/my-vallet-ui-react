import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountPagination {
  currentPage: number;
  maxPage: number;
}

const initialState: AccountPagination = {
  currentPage: 1,
  maxPage: 1,
};

const accountsPaginationSlice = createSlice({
  name: "accountsPagination",
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
accountsPaginationSlice.actions;

export default accountsPaginationSlice.reducer;
