import { GetAccount } from "my-wallet-shared-types/shared-types";
import {
  ColumnDef,
} from "@tanstack/react-table";
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
  deleteButton?: (accountId: number) => JSX.Element
): ColumnDef<GetAccount>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
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

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {deleteButton ? deleteButton(account.id) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default function AccountsTable(props: {
  accounts: ResultWithPagination<GetAccount>;
  deleteButton?: (accountId: number) => JSX.Element;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}) {
  const columns = getColumns(props.deleteButton);

  const paginator: PaginatorInput = {
    setPage: props.setPage,
    currentPage: props.currentPage,
    maxPage: props.accounts.meta.totalPages
  };

  return <Datatable<GetAccount> columns={columns} result={props.accounts} paginator={paginator} />;
}
