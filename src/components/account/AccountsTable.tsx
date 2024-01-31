import { GetAccount } from "my-wallet-shared-types/shared-types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PaginatorInput, ResultWithPagination } from "@/types";
import Datatable from "../shared/data-table/DataTable";
import { getAccountColumns } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { setCurrentPage } from "@/services/state/accounts/accounts-paginator-slice";

interface AccountsTableProps {
  accounts: ResultWithPagination<GetAccount, null>;
  deleteButton?: (accountId: string) => JSX.Element;
  addTransaction?: (accountId: string) => JSX.Element;
}

export default function AccountsTable({
  accounts,
  deleteButton,
  addTransaction,
}: AccountsTableProps) {
  const columns = getAccountColumns(deleteButton, addTransaction);
  const { currentPage, maxPage } = useSelector(
    (state: RootState) => state.accountsPagination
  );
  const dispatch = useDispatch();
  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
};

  const paginator: PaginatorInput = {
    setPage: setPage,
    currentPage: currentPage,
    maxPage
  };

  const table = useReactTable({
    data: accounts.items,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Datatable<GetAccount> table={table} paginator={paginator} />;
}

