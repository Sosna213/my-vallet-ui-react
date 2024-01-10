import AccountsTable from "@/components/account/AccountsTable";
import CreateAccountDialog from "@/components/account/CreateAccountDialog";
import EmptyState from "@/components/shared/EmptyState";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchAccounts,
  createAccount,
  deleteAccount,
} from "@/services/api-calls/accounts";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAccount } from "my-wallet-shared-types/shared-types";
import { useState } from "react";

function Accounts(props: { readonly?: boolean } = { readonly: false }) {
  const [page, setPage] = useState<number>(1);
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
    queryKey: ["accounts"],
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
    mutationFn: async (accountId: number) => {
      const token = await getAccessTokenSilently();

      return deleteAccount(token, accountId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const deleteButton =(accountId: number) => {
    return (
      <DropdownMenuItem
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
      </DropdownMenuItem>
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
            setPage={setPage}
            currentPage={page}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Accounts;
