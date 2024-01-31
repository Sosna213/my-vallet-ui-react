import { PaginatorInput, ResultWithPagination } from "@/types";
import { GetTransactionDTO } from "my-wallet-shared-types/shared-types";
import Datatable from "../shared/data-table/DataTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TransactionFacets } from "@/services/state/transactions-filters/transactions-facets-slice";
import { getTransactionsColumns } from "./utils";

interface TransactionTableProps {
  transactions: ResultWithPagination<GetTransactionDTO, TransactionFacets>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

function TransactionTable({
  transactions,
  setPage,
  currentPage,
}: TransactionTableProps): React.ReactElement {
  const paginator: PaginatorInput = {
    setPage: setPage,
    currentPage: currentPage,
    maxPage: transactions.meta.totalPages,
  };

  const columns = getTransactionsColumns();
  const table = useReactTable({
    data: transactions.items,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
      <Datatable<GetTransactionDTO> table={table} paginator={paginator} />
  );
}

export default TransactionTable;
