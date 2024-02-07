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

interface AccountsProps {
  readonly?: boolean;
}
function Accounts({ readonly = false }: AccountsProps) {
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
        message="There is no accaount created"
        button={!readonly ? addAccoutnButton : undefined}
        small={readonly}
      />
    );
  }

  return (
    <Card className={`w-full ${readonly ? "min-h-[365px]" : ""}`}>
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
