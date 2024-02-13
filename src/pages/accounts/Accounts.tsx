import AccountsTable from "@/components/account/AccountsTable";
import CreateAccountDialog from "@/components/account/CreateAccountDialog";
import DeleteAccountDialog from "@/components/account/DeleteAccountDialog";
import EmptyState from "@/components/shared/EmptyState";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import CreateTransactionDialog from "@/components/transactions/CreateTransactionDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAccountsQueryAndMutations from "./useAccountsQueryAndMutations";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { createTransactions } from "@/services/api-calls/transactions";

interface AccountsProps {
  readonly?: boolean;
}
function Accounts({ readonly = false }: AccountsProps) {
  const { getAccessTokenSilently } = useAuth0();
  const { accounts, error, isLoading, refetch, addAcount, addTransaction } =
    useAccountsQueryAndMutations({ readonly });
  const addAccoutnButton = <CreateAccountDialog addAccount={addAcount} />;

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
        title="Accounts"
        message="There is no accaount created"
        button={addAccoutnButton}
        small={readonly}
      />
    );
  }

  return (
    <Card className={`w-full ${readonly ? "min-h-[365px]" : ""}`}>
            <Button onClick={async () => {
        const token = await getAccessTokenSilently();
        createTransactions(token)
      }}>Test</Button>
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
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Accounts;
