import { GetAccount } from "my-wallet-shared-types/shared-types";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PaginatorInput, ResultWithPagination } from "@/types";
import Datatable from "../shared/DataTable/DataTable";

const getColumns = (
  deleteButton?: (accountId: string) => JSX.Element,
  addTransaction?: (accountId: string) => JSX.Element
): ColumnDef<GetAccount>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const account = row.original;

        if (!deleteButton || !addTransaction) {
          return null;
        }

        return (
          <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {deleteButton ? (
                <div className="w-full flex justify-center">
                  {deleteButton(account.id)}
                </div>
              ) : null}
              {addTransaction ? (
                <div className="w-full">{addTransaction(account.id)}</div>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default function AccountsTable(props: {
  accounts: ResultWithPagination<GetAccount>;
  deleteButton?: (accountId: string) => JSX.Element;
  addTransaction?: (accountId: string) => JSX.Element;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}) {
  const columns = getColumns(props.deleteButton, props.addTransaction);

  const paginator: PaginatorInput = {
    setPage: props.setPage,
    currentPage: props.currentPage,
    maxPage: props.accounts.meta.totalPages,
  };

  const table = useReactTable({
    data: props.accounts.items,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <Datatable<GetAccount>
      table={table}
    paginator={paginator}
    />
  );
}
