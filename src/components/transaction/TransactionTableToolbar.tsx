import DataTableFilter from "../shared/DataTable/DataTableFilter";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  setTransactionName,
  setCategory,
  resetFilters,
} from "@/services/state/transactions-filters/transactions-filter-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { Input } from "../ui/input";
import { TransactionsCategories } from "@/utils/enums";

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

        <DataTableFilter
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
