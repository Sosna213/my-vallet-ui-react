import React from "react";
import { Card } from "../ui/card";

interface EmptyStateProps {
  message: string;
  button?: JSX.Element;
  small?: boolean;
}

const EmptyState = ({
  message,
  button,
  small,
}: EmptyStateProps): React.ReactElement => {
  return (
    <Card className="flex w-full justify-center items-center flex-col flex-wrap">
      <img
        src={"/assets/icons/empty.svg"}
        alt={"empty"}
        width={small ? 124 : 248}
        className="invert"
      />
      <div className="pb-4 font-bold text-3xl">{message}</div>
      {button}
    </Card>
  );
};

export default EmptyState;
