import AccountsTable from "@/components/account/AccountsTable";
import CreateAccountDialog from "@/components/account/CreateAccountDialog";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAccounts,
  createAccount,
  deleteAccount,
} from "@/services/api-calls/accounts";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAccount } from "my-wallet-shared-types/shared-types";

function Accounts() {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const {
    data: accounts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();

      return fetchAccounts(token);
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
    mutationFn: async (accountId: number) => {
      const token = await getAccessTokenSilently();

      return deleteAccount(token, accountId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const deleteButton = (accountId: number) => {
    return (
      <Button
        onClick={async () => {
          try {
            await deleteAcc(accountId);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Delete
      </Button>
    );
  };

  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }
  if (error) {
    return <p>Error</p>;
  }
  if (accounts && accounts.length === 0) {
    return (
      <EmptyState
        message="There is no accaount created"
        button={addAccoutnButton}
      />
    );
  }

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2">
            <div>Accounts</div>
            <div className="text-end">{addAccoutnButton}</div>
          </div>
        </CardTitle>
        <CardDescription>User accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <AccountsTable accounts={accounts ?? []} deleteButton={deleteButton} />
      </CardContent>
    </Card>
  );
}

export default Accounts;
