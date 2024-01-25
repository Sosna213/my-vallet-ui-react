import { GetAccount } from "my-wallet-shared-types/shared-types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PaginatorInput, ResultWithPagination } from "@/types";
import Datatable from "../shared/DataTable/DataTable";
import { getAccountColumns } from "./utils";

interface AccountsTableProps {
  accounts: ResultWithPagination<GetAccount, null>;
  deleteButton?: (accountId: string) => JSX.Element;
  addTransaction?: (accountId: string) => JSX.Element;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export default function AccountsTable({
  accounts,
  deleteButton,
  addTransaction,
  setPage,
  currentPage,
}: AccountsTableProps) {
  const columns = getAccountColumns(deleteButton, addTransaction);

  const paginator: PaginatorInput = {
    setPage: setPage,
    currentPage: currentPage,
    maxPage: accounts.meta.totalPages,
  };

  const table = useReactTable({
    data: accounts.items,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Datatable<GetAccount> table={table} paginator={paginator} />;
}
