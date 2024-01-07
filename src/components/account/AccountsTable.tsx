import { GetAccount } from "my-wallet-shared-types/shared-types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function AccountsTable(props: {accounts: GetAccount[], deleteButton?: (accountId: number) => JSX.Element}) {
  return (
    <Table>
          <TableCaption>Accounts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-right">Currency</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.accounts?.map((account) => {
              return (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.balance}</TableCell>
                  <TableCell className="text-right">
                    {account.currency}
                  </TableCell>
                  <TableCell className="text-right">
                    {props.deleteButton !== undefined ? props.deleteButton(account.id) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
  )
}
