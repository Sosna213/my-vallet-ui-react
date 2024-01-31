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
  setAccountId,
  setCurrency,
} from "@/services/state/transactions-filters/transactions-filter-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { Input } from "../ui/input";
import {
  DateFilter,
  NumericFilter,
  SelectableFilter,
} from "../shared/data-table/filters";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

function TransactionTableToolbar(): React.ReactElement {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.transactionsFilter);
  const [search, setSearch] = useState<string>(filters.transactionName ?? "");
  const facets = useSelector((state: RootState) => state.transactionsFacets);
  const { account = [], currency = [], category =[] } = facets;

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setTransactionName(debouncedSearch));
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter data..."
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <SelectableFilter
          facetsValue={account}
          setFilterValue={(filters: string[]) => {
            dispatch(setAccountId(filters));
          }}
          selectedFilterValues={filters.accountId}
          title="Account"
        />
        <SelectableFilter
          facetsValue={category}
          setFilterValue={(filters: string[]) => {
            dispatch(setCategory(filters));
          }}
          selectedFilterValues={filters.category}
          title="Category"
        />
        <NumericFilter
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
        <DateFilter
          title="Date"
          filterPeriodFrom={
            filters.fromDate ? new Date(filters.fromDate) : undefined
          }
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
        <SelectableFilter
          facetsValue={currency}
          setFilterValue={(filters: string[]) => {
            dispatch(setCurrency(filters));
          }}
          selectedFilterValues={filters.currency}
          title="Currency"
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
