import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function Error(props: {refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>>}) {
    return (
      <Card className="flex w-full justify-center items-center flex-col flex-wrap">
          <img
            src={"/assets/icons/error.svg"}
            alt={"empty"}
            width={248}
            className="invert"
          />
          <div className="pb-4 font-bold text-3xl">Error while loading data</div>
          {props.refetch ? <Button onClick={() => {props?.refetch && props?.refetch()}}>Refetch</Button> : null}
      </Card>
    )
}