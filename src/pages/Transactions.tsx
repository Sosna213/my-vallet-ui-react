import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchTransactions } from "@/services/api-calls/transactions";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Error from "@/components/shared/Error";
import TransactionTable from "@/components/transaction/TransactionTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import TransactionTableToolbar from "@/components/transaction/TransactionTableToolbar";
import { TransactionsFilters } from "my-wallet-shared-types/shared-types";
import { useDebounce } from "usehooks-ts";
import { setTransactionsFilterFacets } from "@/components/transaction/utils";

interface TransactionsProps {
  readonly?: boolean;
}

function Transactions({ readonly = false }: TransactionsProps) {
  const [page, setPage] = useState<number>(1);
  const { getAccessTokenSilently } = useAuth0();
  const filters = useSelector((state: RootState) => state.transactionsFilter);
  const dispatch = useDispatch();
  const debouncedFilters = useDebounce<TransactionsFilters>(filters, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters]);

  const { data, error, refetch } = useQuery({
    queryKey: ["transactions", { page, ...debouncedFilters }],
    select: (data) => {
      setTransactionsFilterFacets(data, dispatch);
      return data;
    },
    queryFn: async () => {
      const token = await getAccessTokenSilently();

      return fetchTransactions(
        token,
        debouncedFilters,
        page,
        readonly ? 3 : 10
      );
    },
  });

  if (error) {
    return <Error refetch={refetch} />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div>Transactions</div>
        </CardTitle>
        <CardDescription>User transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionTableToolbar />
        {data?.items && (
          <TransactionTable
            transactions={data}
            setPage={setPage}
            currentPage={page}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Transactions;
