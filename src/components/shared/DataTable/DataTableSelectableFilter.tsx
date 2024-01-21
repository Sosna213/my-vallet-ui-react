import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";

interface FacetValue {
  id?: string;
  count: number;
  key: string;
}

interface DataTableFacetedFilterProps {
  selectedFilterValues?: string[];
  setFilterValue: (filters: string[]) => void;
  title?: string;
  facetsValue: FacetValue[];
}

function DataTableFilter({
  selectedFilterValues,
  setFilterValue,
  facetsValue,
  title,
}: DataTableFacetedFilterProps) {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set(selectedFilterValues));

  useEffect(() => {
    setSelectedValues(new Set(selectedFilterValues));
  }, [selectedFilterValues]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  facetsValue
                    .filter((facet) => selectedValues.has(facet?.id ? facet.id : facet.key))
                    .map((facet) => (
                      <Badge
                        variant="secondary"
                        key={facet?.id ? facet.id : facet.key}
                        className="rounded-sm px-1 font-normal"
                      >
                        {facet.key}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {facetsValue.map((facet) => {
                const isSelected = selectedValues.has(facet?.id ? facet.id : facet.key);
                return (
                  <CommandItem
                    key={facet.key}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValues((prev) => {
                          const next = new Set(prev);
                          next.delete(facet?.id ? facet.id : facet.key);
                          return next;
                        });
                      } else {
                        setSelectedValues((prev) => {
                          const next = new Set(prev);
                          next.add(facet?.id ? facet.id : facet.key);
                          return next;
                        });
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{facet.key}</span>
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {facet.count}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValues(new Set([]))}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
        <div className="flex justify-end m-4">
          <PopoverClose asChild>
            <Button
              onClick={() => {
                setFilterValue(Array.from(selectedValues));
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

export default DataTableFilter;
