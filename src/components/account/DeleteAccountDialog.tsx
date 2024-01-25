import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteAccount } from "@/services/api-calls/accounts";
import React from "react";

interface DeleteAccountDialogProps {
  accountId: string;
}

const DeleteAccountDialog = ({
  accountId,
}: DeleteAccountDialogProps): React.ReactElement => {
  const { toast } = useToast();
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAcc } = useMutation({
    mutationFn: async (accountId: string) => {
      const token = await getAccessTokenSilently();
      return deleteAccount(token, accountId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-normal w-full" variant="ghost">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild={true}>
            <Button
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
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
