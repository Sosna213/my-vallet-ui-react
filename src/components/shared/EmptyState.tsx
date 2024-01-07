import { Card } from "../ui/card";

export default function EmptyState(props: {message: string, button?: JSX.Element}) {
  return (
    <Card className="flex w-full justify-center items-center flex-col flex-wrap">
        <img
          src={"/assets/icons/empty.svg"}
          alt={"empty"}
          width={248}
          className="invert"
        />
        <div className="pb-4 font-bold text-3xl">{props.message}</div>
        {props.button}
    </Card>
  );
}
