import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";

interface NumericFilterProps {
  filterValueEq?: number;
  filterValueFrom?: number;
  filterValueTo?: number;
  setFilterValue: (
    eq: number | undefined,
    from: number | undefined,
    to: number | undefined
  ) => void;
  title?: string;
}

function NumericFilter({
  filterValueEq,
  filterValueFrom,
  filterValueTo,
  setFilterValue,
  title,
}: NumericFilterProps): React.ReactElement {
  const [equals, setEquals] = useState<number | undefined>(filterValueEq);
  const [from, setFrom] = useState<number | undefined>(filterValueFrom);
  const [to, setTo] = useState<number | undefined>(filterValueTo);
  const [filterMode, setFilterMode] = useState<"equals" | "range">(
    filterValueFrom ? "range" : "equals"
  );

  useEffect(() => {
    setEquals(filterValueEq);
  }, [filterValueEq]);

  useEffect(() => {
    setFrom(filterValueFrom);
  }, [filterValueFrom]);

  useEffect(() => {
    setTo(filterValueTo);
  }, [filterValueTo]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {filterMode === "equals" && equals !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {equals}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  key={equals}
                  className="rounded-sm px-1 font-normal"
                >
                  {equals}
                </Badge>
              </div>
            </>
          )}
          {filterMode === "range" && from !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {from}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  key={from}
                  className="rounded-sm px-1 font-normal"
                >
                  From: {from}
                </Badge>
              </div>
            </>
          )}
          {filterMode === "range" && to !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {to}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  key={to}
                  className="rounded-sm px-1 font-normal"
                >
                  To: {to}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="m-4">
          <RadioGroup
            defaultValue={filterMode}
            onValueChange={(e: "equals" | "range") => {
              if (e === "equals") {
                setFrom(undefined);
                setTo(undefined);
              } else {
                setEquals(undefined);
              }
              setFilterMode(e);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equals" id="equals" />
              <Label htmlFor="equals">Equals</Label>
              <RadioGroupItem value="range" id="range" />
              <Label htmlFor="range">Range</Label>
            </div>
          </RadioGroup>
          <Separator className="my-2" />
          {filterMode === "equals" ? (
            <div>
              <Label htmlFor="amount" className="mb-2">
                Amount
              </Label>
              <Input
                value={equals}
                type="number"
                id="amount"
                placeholder="Amount"
                onChange={(e) => setEquals(Number(e.target.value))}
              />
            </div>
          ) : (
            <div>
              <div>
                <Label htmlFor="from" className="mb-2">
                  From
                </Label>
                <Input
                  value={from}
                  type="number"
                  id="amount"
                  placeholder="From"
                  onChange={(e) => setFrom(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="to" className="mb-2">
                  To
                </Label>
                <Input
                  value={to}
                  type="number"
                  id="to"
                  placeholder="To"
                  onChange={(e) => setTo(Number(e.target.value))}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <PopoverClose asChild>
              <Button
                onClick={() => {
                  setFilterValue(equals, from, to);
                }}
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NumericFilter;
