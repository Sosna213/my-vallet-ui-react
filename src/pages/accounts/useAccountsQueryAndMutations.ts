import { createAccount, fetchAccounts } from "@/services/api-calls/accounts";
import { createTransaction } from "@/services/api-calls/transactions";
import {
  setCurrentPage,
  setMaxPage,
} from "@/services/state/accounts/accounts-paginator-slice";
import { RootState } from "@/services/state/store";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateAccount,
  CreateTransactionDTO,
} from "my-wallet-shared-types/shared-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

interface HookProps {
  readonly?: boolean;
}

export default function useAccountsQueryAndMutations({ readonly }: HookProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const initPage = !readonly ? searchParams.get("page") ?? 1 : 1;
  const { currentPage } = useSelector(
    (state: RootState) => state.accountsPagination
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(Number(initPage)));
    return () => {
      dispatch(setCurrentPage(1));
    };
  }, []);
  const queryClient = useQueryClient();

  const {
    data: accounts,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["accounts", { currentPage }],
    select: (data) => {
      dispatch(setMaxPage(data.meta.totalPages));
      return data;
    },
    queryFn: async () => {
      const token = await getAccessTokenSilently();

      return fetchAccounts(token, currentPage, readonly ? 3 : 10);
    },
  });

  const { mutateAsync: addAcount } = useMutation({
    mutationFn: async (accountToCreate: CreateAccount) => {
      const token = await getAccessTokenSilently();

      return createAccount(token, accountToCreate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const { mutateAsync: addTransaction } = useMutation({
    mutationFn: async (transactionToCreate: CreateTransactionDTO) => {
      const token = await getAccessTokenSilently();

      return createTransaction(token, transactionToCreate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  return {
    accounts,
    error,
    isLoading,
    refetch,
    addAcount,
    addTransaction,
  };
}
