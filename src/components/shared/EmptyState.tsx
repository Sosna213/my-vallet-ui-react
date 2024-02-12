import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface EmptyStateProps {
  title: string;
  message: string;
  button?: JSX.Element;
  small?: boolean;
}

const EmptyState = ({
  title,
  message,
  button,
  small,
}: EmptyStateProps): React.ReactElement => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-2">
            <div>{title}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="justify-center flex flex-col flex-wrap items-center p-6">
        <img
          src={"/assets/icons/empty.svg"}
          alt={"empty"}
          width={small ? 184 : 248}
          className="dark:invert"
        />
        <div className="pb-4 font-bold text-3xl text-center">{message}</div>
        {button}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
