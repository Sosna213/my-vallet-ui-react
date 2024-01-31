import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { fetchTransactionsExpensesGroupedByCategories } from "@/services/api-calls/transactions";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Error, EmptyState, Loading } from "../shared";
import { TransactionsChartFilters } from "my-wallet-shared-types/shared-types";
import { SelectableFilter } from "../shared/data-table/filters";
import { useState } from "react";
import {
  TransactionGroupedByCategory,
  TransactionsExpensesGroupedByCategoryAndAcounts,
} from "@/types";

const SpendingsGroupedByCategory = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accountFilter, setAccountFilter] = useState<string[]>([]);

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["transactionsGroupedByCategory", accountFilter],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const params: TransactionsChartFilters = {
        fromDate: new Date(year, month, 1).toISOString(),
        toDate: today.toISOString(),
        accountId: accountFilter,
      };

      return fetchTransactionsExpensesGroupedByCategories(token, params);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.error(error.message);
    return <Error refetch={refetch} />;
  }
  if (!data?.transactionsGroupedByCategory) {
    return <EmptyState message="There is no enought data about transactios" />;
  }

  const chartData = generateChartData(data);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div>This month's expenses grouped by category</div>
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
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default SpendingsGroupedByCategory;


const generateChartData = (
  data: TransactionsExpensesGroupedByCategoryAndAcounts
) => {
  return {
    labels: data.transactionsGroupedByCategory.map(
      (item: TransactionGroupedByCategory) => item.category
    ),
    datasets: [
      {
        label: "Spendings",
        data: data.transactionsGroupedByCategory.map(
          (item: TransactionGroupedByCategory) => Math.abs(item.amount)
        ),
        backgroundColor: ["white"],
        hoverOffset: 4,
      },
    ],
  };
};