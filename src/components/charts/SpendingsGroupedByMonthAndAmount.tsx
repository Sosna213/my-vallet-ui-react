import { fetchTransactionsExpensesGroupedByMonthsAndAmount } from "@/services/api-calls/transactions";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { TransactionsChartFilters } from "my-wallet-shared-types/shared-types";
import { useState } from "react";
import { Loading, Error, EmptyState } from "../shared";
import {
  TransactionGroupedByMonth,
  TransactionsExpensesByMonth,
} from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectableFilter } from "../shared/data-table/filters";
import { Line } from "react-chartjs-2";
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";

function SpendingsGroupedByMonthAndAmount() {
  const { getAccessTokenSilently } = useAuth0();
  const [accountFilter, setAccountFilter] = useState<string[]>([]);

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["transactionsGroupedByMonthAndAmount", accountFilter],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      const params: TransactionsChartFilters = {
        accountId: accountFilter,
      };

      return fetchTransactionsExpensesGroupedByMonthsAndAmount(token, params);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.error(error.message);
    return <Error refetch={refetch} />;
  }
  if (
    !data?.incomingTransactionsGroupedByMonth &&
    !data?.outgoingTransactionsGroupedByMonth
  ) {
    return <EmptyState message="There is no enought data about transactios" />;
  }

  const chartData = generateChartData(data);
  
  const position:
    | "bottom"
    | "left"
    | "top"
    | "right"
    | "center"
    | "chartArea"
    | _DeepPartialObject<{ [scaleId: string]: number }> = "bottom";

  const options = {
    plugins: {
      legend: {
        position: position,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div>Tranactions grouped by month</div>
          <div className="mt-3">
            <SelectableFilter
              facetsValue={data.accounts}
              setFilterValue={(filters: string[]) => {
                setAccountFilter(filters);
              }}
              selectedFilterValues={accountFilter}
              title="Account"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[350px] flex justify-center">
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}

export default SpendingsGroupedByMonthAndAmount;

const generateChartData = (data: TransactionsExpensesByMonth) => {
  return {
    labels: data.outgoingTransactionsGroupedByMonth.map(
      (item: TransactionGroupedByMonth) =>
        new Date(Number(item.year), Number(item.month)-1, 1).toLocaleDateString(
          "en-US",
          { month: "short", year: "numeric" }
        )
    ),
    datasets: [
      {
        label: "Incoming",
        data: data.incomingTransactionsGroupedByMonth.map(
          (item: TransactionGroupedByMonth) => Math.abs(item.amount)
        ),
        backgroundColor: ["white"],
        hoverOffset: 4,
        borderColor: "white",
      },
      {
        label: "Outgoing",
        data: data.outgoingTransactionsGroupedByMonth.map(
          (item: TransactionGroupedByMonth) => Math.abs(item.amount)
        ),
        backgroundColor: ["grey"],
        hoverOffset: 4,
        borderColor: "grey",
      },
    ],
  };
};