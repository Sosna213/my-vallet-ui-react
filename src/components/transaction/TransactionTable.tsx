import { PaginatorInput, ResultWithPagination } from "@/types";
import { GetTransactionDTO } from "my-wallet-shared-types/shared-types";
import Datatable from "../shared/DataTable/DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { FormattedNumber } from "react-intl";

const getColumns = (): ColumnDef<GetTransactionDTO>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "account.name",
      header: "Account name",
    },
    {
      accessorKey: "category",  
      header: "Category",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {        
        return (
          <div>
            <FormattedNumber
              value={row.getValue("amount")}
              style="currency"
              currency={row.original.account.currency}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{format(row.getValue("date"), "PPP")}</div>,
    },
  ];
};

function TransactionTable(props: {
  transactions: ResultWithPagination<GetTransactionDTO>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}) {
  const paginator: PaginatorInput = {
    setPage: props.setPage,
    currentPage: props.currentPage,
    maxPage: props.transactions.meta.totalPages,
  };

  const columns = getColumns();
  const table = useReactTable({
    data: props.transactions.items,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Datatable<GetTransactionDTO> table={table} paginator={paginator} />
    </div>
  );
}

export default TransactionTable;
