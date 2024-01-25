import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const Loading = (): React.ReactElement => {
  return (
    <Card className="p-12 flex w-full flex-col flex-wrap">
      <Skeleton className="w-1/2 m-2 h-14 rounded-full" />
      <Skeleton className="w-full m-2 h-1/2" />
    </Card>
  );
};
export default Loading;
