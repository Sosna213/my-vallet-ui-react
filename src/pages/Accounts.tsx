import AccountsTable from "@/components/account/AccountsTable";
import CreateAccountDialog from "@/components/account/CreateAccountDialog";
import DeleteAccountDialog from "@/components/account/DeleteAccountDialog";
import EmptyState from "@/components/shared/EmptyState";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import CreateTransactionDialog from "@/components/transaction/CreateTransactionDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAccounts, createAccount } from "@/services/api-calls/accounts";
import { createTransaction } from "@/services/api-calls/transactions";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateAccount,
  CreateTransactionDTO,
} from "my-wallet-shared-types/shared-types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface AccountsProps {
  readonly?: boolean;
}

function Accounts({ readonly = false }: AccountsProps) {
  const [searchParams] = useSearchParams();
  const initPage = !readonly ? searchParams.get("page") ?? 1 : 1;


  const [page, setPage] = useState<number>(
    Number(Number(initPage))
  );
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

  const addAccoutnButton = <CreateAccountDialog addAccount={addAcount} />;

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

  const deleteButton = (accountId: string) => {
    return <DeleteAccountDialog accountId={accountId} />;
  };

  const addTransactionButton = (accountId: string) => {
    return (
      <CreateTransactionDialog
        accountId={accountId}
        addTransaction={addTransaction}
      />
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error refetch={refetch} />;
  }
  if (accounts && accounts.items.length === 0) {
    return (
      <EmptyState
        message="There is no accaount created"
        button={!readonly ? addAccoutnButton : undefined}
        small={readonly}
      />
    );
  }

  return (
    <Card className={`w-full ${readonly ? 'min-h-[365px]' : ''}`}>
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2">
            <div>Accounts</div>
            {!readonly && <div className="text-end">{addAccoutnButton}</div>}
          </div>
        </CardTitle>
        <CardDescription>User accounts</CardDescription>
      </CardHeader>
      <CardContent>
        {accounts && (
          <AccountsTable
            accounts={accounts}
            deleteButton={!readonly ? deleteButton : undefined}
            addTransaction={!readonly ? addTransactionButton : undefined}
            setPage={setPage}
            currentPage={page}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Accounts;
