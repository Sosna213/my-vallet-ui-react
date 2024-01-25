import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FormattedNumber } from "react-intl";
import { ColumnDef } from "@tanstack/react-table";
import { GetAccount } from "my-wallet-shared-types/shared-types";

export const getAccountColumns = (
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
      cell: ({ row }) => {
        return (
          <div>
            <FormattedNumber
              value={row.getValue("balance")}
              style="currency"
              currency={row.original.currency}
            />
          </div>
        );
      },
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
