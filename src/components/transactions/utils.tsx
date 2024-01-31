import { TransactionFacets, setAccountFacets, setCategoryFacets, setCurrencyFacets } from "@/services/state/transactions-filters/transactions-facets-slice";
import { ResultWithPagination } from "@/types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { GetTransactionDTO } from "my-wallet-shared-types/shared-types";
import { FormattedNumber } from "react-intl";

export const getTransactionsColumns = (): ColumnDef<GetTransactionDTO>[] => {
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

  export const setTransactionsFilterFacets = (
    data: ResultWithPagination<GetTransactionDTO, TransactionFacets>,
    dispatch: Dispatch<UnknownAction>
  ): void => {
    if (data.facets) {
      if (data.facets.category) {
        dispatch(setCategoryFacets(data.facets.category));
      }
      if (data.facets.account) {
        dispatch(setAccountFacets(data.facets.account));
      }
      if (data.facets.currency) {
        dispatch(setCurrencyFacets(data.facets.currency));
      }
    }
  };