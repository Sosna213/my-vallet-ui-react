import { createAccount, fetchAccounts } from "@/services/api-calls/accounts";
import { createTransaction } from "@/services/api-calls/transactions";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateAccount,
  CreateTransactionDTO,
} from "my-wallet-shared-types/shared-types";

interface HookProps {
  readonly?: boolean;
  page: number;
}

export default function useAccountsQueryAndMutations({
  readonly,
  page,
}: HookProps) {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const {
    data: accounts,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["accounts", { page }],
    queryFn: async () => {
      const token = await getAccessTokenSilently();

      return fetchAccounts(token, page, readonly ? 3 : 10);
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
  }
}
