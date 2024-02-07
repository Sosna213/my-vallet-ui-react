import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Error from "@/components/shared/Error";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionTableToolbar from "@/components/transactions/TransactionTableToolbar";
import { Loading } from "@/components/shared";
import { useTransactionsInit } from "./useTransactionsInit";

interface TransactionsProps {
  readonly?: boolean;
}

function Transactions({ readonly = false }: TransactionsProps) {
  const { data, error, refetch, isLoading } = useTransactionsInit({readonly});

  if (error) {
    return <Error refetch={refetch} />;
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          <div>Transactions</div>
        </CardTitle>
        <CardDescription>User transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionTableToolbar />
        {isLoading ? (
          <Loading />
        ) : (
          data?.items && <TransactionTable transactions={data} />
        )}
      </CardContent>
    </Card>
  );
}

export default Transactions;
