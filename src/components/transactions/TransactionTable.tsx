import { PaginatorInput, ResultWithPagination } from "@/types";
import { GetTransactionDTO } from "my-wallet-shared-types/shared-types";
import Datatable from "../shared/data-table/DataTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TransactionFacets } from "@/services/state/transactions/transactions-facets-slice";
import { getTransactionsColumns } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { setCurrentPage } from "@/services/state/transactions/transactions-paginator-slice";

interface TransactionTableProps {
  transactions: ResultWithPagination<GetTransactionDTO, TransactionFacets>;
}

function TransactionTable({
  transactions,
}: TransactionTableProps): React.ReactElement {
  const {currentPage, maxPage} = useSelector((state: RootState) => state.transactionsPagination);
  const dispatch = useDispatch();
  const setPage = (page: number) => {
      dispatch(setCurrentPage(page));
  };
  
  const paginator: PaginatorInput = {
    setPage: setPage,
    currentPage: currentPage,
    maxPage: maxPage || 1,
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
