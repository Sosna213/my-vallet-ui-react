import AccountsTable from "@/components/account/AccountsTable";
import CreateAccountDialog from "@/components/account/CreateAccountDialog";
import EmptyState from "@/components/shared/EmptyState";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import CreateTransactionDialog from "@/components/transaction/CreateTransactionDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchAccounts,
  createAccount,
  deleteAccount,
} from "@/services/api-calls/accounts";
import { createTransaction } from "@/services/api-calls/transactions";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateAccount,
  CreateTransactionDTO,
} from "my-wallet-shared-types/shared-types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Accounts(props: { readonly?: boolean } = { readonly: false }) {
  const [searchParams] = useSearchParams();
  
  const [page, setPage] = useState<number>(Number(searchParams.get('page') ?? 1));
  const { toast } = useToast();
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const { readonly } = props;

  const {
    data: accounts,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["accounts", {page}],
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

  const { mutateAsync: deleteAcc } = useMutation({
    mutationFn: async (accountId: string) => {
      const token = await getAccessTokenSilently();

      return deleteAccount(token, accountId);
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

  const deleteButton = (accountId: string) => {
    return (
      <Button
        className="w-full font-normal"
        variant={"ghost"}
        onClick={async () => {
          try {
            await deleteAcc(accountId);
            toast({
              title: "Success",
              description: "Account deleted successfuly.",
            });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Delete
      </Button>
    );
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
    <Card className="w-full">
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
