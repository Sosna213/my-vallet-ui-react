import DataTableSelectableFilter from "../shared/DataTable/DataTableSelectableFilter";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  setTransactionName,
  setCategory,
  resetFilters,
  setEq,
  setGte,
  setLte,
  setDateFrom,
  setDateTo,
} from "@/services/state/transactions-filters/transactions-filter-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { Input } from "../ui/input";
import { TransactionsCategories } from "@/utils/enums";
import DataTableNumericFilter from "../shared/DataTable/DataTableNumericFilter";
import DataTableDateFilter from "../shared/DataTable/DataTableDateFilter";

function TransactionTableToolbar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.transactionsFilter);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter data..."
          value={filters.transactionName ?? ""}
          onChange={(event) =>
            dispatch(setTransactionName(event.currentTarget.value))
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <DataTableSelectableFilter
          setFilterValue={(filters: string[]) => {
            dispatch(setCategory(filters));
          }}
          selectedFilterValues={filters.category}
          title="Category"
          options={[
            ...Object.values(TransactionsCategories).map((value) => {
              return { label: value, value: value };
            }),
          ]}
        />
        <DataTableNumericFilter
          title="Amount"
          setFilterValue={(
            eq: number | undefined,
            from: number | undefined,
            to: number | undefined
          ) => {
            dispatch(setEq(eq));
            dispatch(setGte(from));
            dispatch(setLte(to));
          }}
          filterValueEq={filters.eq}
          filterValueFrom={filters.gte}
          filterValueTo={filters.lte}
        />
        <DataTableDateFilter
          title="Date"
          filterPeriodFrom={filters.fromDate ? new Date(filters.fromDate) : undefined}
          filterPeriodTo={filters.toDate ? new Date(filters.toDate) : undefined}
          setPeriodValues={(from, to) => {
            if (from !== undefined) {
              dispatch(setDateFrom(from.toISOString()));
            }
            if (to !== undefined) {
              dispatch(setDateTo(to.toISOString()));
            }
          }}
        />
        <Button
          variant="ghost"
          onClick={() => dispatch(resetFilters())}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default TransactionTableToolbar;
