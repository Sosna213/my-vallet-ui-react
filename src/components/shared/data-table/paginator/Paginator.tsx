import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../../../ui/pagination";
import { Button } from "@/components/ui/button";
import { PaginatorInput } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { usePagination } from "./usePagination";

interface PaginatorProps {
  pagination: PaginatorInput;
}

export default function Paginator({
  pagination: { currentPage, maxPage, setPage },
}: PaginatorProps): React.ReactElement {
  const {
    pages,
    handleButtonClick,
  } = usePagination({ currentPage, maxPage, setPage });

  return (
    <Pagination className="mt-4 mb-4">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={currentPage - 1 <= 0}
            onClick={() => {
              handleButtonClick(Number(currentPage - 1));
            }}
          >
            <ChevronLeftIcon className="h-4 w-4" /> Previous
          </Button>
        </PaginationItem>
        {!pages.includes(1) && (
          <PaginationItem>
            <Button
              variant={1 === currentPage ? "default" : "ghost"}
              onClick={() => {
                handleButtonClick(1);
              }}
            >
              {1}
            </Button>
          </PaginationItem>
        )}
        {!pages.includes(2) && maxPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((val) => {
          return (
            <PaginationItem key={val}>
              <Button
                variant={val === currentPage ? "default" : "ghost"}
                onClick={() => {
                  handleButtonClick(val);
                }}
              >
                {val}
              </Button>
            </PaginationItem>
          );
        })}
        {!pages.includes(maxPage - 1) && maxPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!pages.includes(maxPage) && (
          <PaginationItem>
            <Button
              variant={maxPage === currentPage ? "default" : "ghost"}
              onClick={() => {
                handleButtonClick(maxPage);
              }}
            >
              {maxPage}
            </Button>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={currentPage + 1 > maxPage}
            onClick={() => {
              handleButtonClick(Number(currentPage + 1));
            }}
          >
            Next <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
