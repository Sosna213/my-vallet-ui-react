import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface DateFilterProps {
  filterPeriodFrom?: Date;
  filterPeriodTo?: Date;
  setPeriodValues: (from: Date | undefined, to: Date | undefined) => void;
  title?: string;
}

function DateFilter({
  filterPeriodFrom,
  filterPeriodTo,
  setPeriodValues,
  title,
}: DateFilterProps): React.ReactElement {
  const [date, setDate] = useState<DateRange | undefined>({
    from: filterPeriodFrom,
    to: filterPeriodTo,
  });

  useEffect(() => {
    setDate({ from: filterPeriodFrom, to: filterPeriodTo });
  }, [filterPeriodFrom, filterPeriodTo]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}

          {date?.from !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {date.from.toDateString()}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  key={date.from.toDateString()}
                  className="rounded-sm px-1 font-normal"
                >
                  From: {date.from.toDateString()}
                </Badge>
              </div>
            </>
          )}
          {date?.to !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {date.to.toDateString()}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  key={date.to.toDateString()}
                  className="rounded-sm px-1 font-normal"
                >
                  To: {date.to.toDateString()}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[520px] p-0" align="start">
        <div className="m-4">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </div>

        <div className="flex justify-end m-4">
          <PopoverClose asChild>
            <Button
              onClick={() => {
                setPeriodValues(date?.from, date?.to);
              }}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateFilter;
