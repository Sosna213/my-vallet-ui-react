import { setTransactionsFilterFacets } from "@/components/transactions/utils";
import { fetchTransactions } from "@/services/api-calls/transactions";
import { setMaxPage } from "@/services/state/accounts/accounts-paginator-slice";
import { RootState } from "@/services/state/store";
import { setCurrentPage } from "@/services/state/transactions/transactions-paginator-slice";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { TransactionsFilters } from "my-wallet-shared-types/shared-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";

interface HookProps {
  readonly?: boolean;
}

export function useTransactionsInit({ readonly }: HookProps) {
  const [searchParams] = useSearchParams();
  const initPage = !readonly ? searchParams.get("page") ?? 1 : 1;

  const { getAccessTokenSilently } = useAuth0();
  const filters = useSelector((state: RootState) => state.transactionsFilter);
  const { currentPage } = useSelector(
    (state: RootState) => state.transactionsPagination
  );
  const dispatch = useDispatch();
  const debouncedFilters = useDebounce<TransactionsFilters>(filters, 500);

  useEffect(() => {
    dispatch(setCurrentPage(Number(initPage)));
    return () => {
      dispatch(setCurrentPage(1));
    };
  }, []);

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["transactions", { currentPage, ...debouncedFilters }],
    staleTime: 1000,
    queryFn: async () => {
      const token = await getAccessTokenSilently();

      return fetchTransactions(
        token,
        debouncedFilters,
        currentPage,
        readonly ? 3 : 10
      );
    },
  });

  useEffect(() => {
    if (data) {
      setTransactionsFilterFacets(data, dispatch);
      dispatch(setMaxPage(data.meta.totalPages));
    }
  }, [data]);

  return { data, error, refetch, isLoading };
}
