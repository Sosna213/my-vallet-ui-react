import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../../ui/pagination";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PaginatorInput } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export default function Paginator(props: { paginator: PaginatorInput }) {
  const {
    paginator: { currentPage, setPage, maxPage },
  } = props;
  const array = [...Array(maxPage).keys()].map((val) => val + 1);
  const index = array.indexOf(currentPage);

  const start = Math.max(0, index - 1);
  const end = Math.min(array.length - 1, index + 1);

  const pages = array.slice(start, end + 1);

  return (
    <Pagination className="mt-4 mb-4">
      <PaginationContent>
        <PaginationItem>
          <Link to={`?page=${currentPage - 1}`}>
            <Button
              variant={"ghost"}
              disabled={currentPage - 1 <= 0}
              onClick={() => {
                setPage(Number(currentPage - 1));
              }}
            >
              <ChevronLeftIcon className="h-4 w-4" /> Previous
            </Button>
          </Link>
        </PaginationItem>
        {!pages.includes(1) && (
          <PaginationItem>
            <Link to={`?page=${1}`}>
              <Button
                variant={1 === currentPage ? "default" : "ghost"}
                onClick={() => {
                  setPage(1);
                }}
              >
                {1}
              </Button>
            </Link>
          </PaginationItem>
        )}
        {!pages.includes(2) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((val) => {
          return (
            <PaginationItem key={val}>
              <Link to={`?page=${val}`}>
                <Button
                  variant={val === currentPage ? "default" : "ghost"}
                  onClick={() => {
                    setPage(val);
                  }}
                >
                  {val}
                </Button>
              </Link>
            </PaginationItem>
          );
        })}
        {!pages.includes(maxPage - 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!pages.includes(maxPage) && (
          <PaginationItem>
            <Link to={`?page=${maxPage}`}>
              <Button
                variant={maxPage === currentPage ? "default" : "ghost"}
                onClick={() => {
                  setPage(maxPage);
                }}
              >
                {maxPage}
              </Button>
            </Link>
          </PaginationItem>
        )}
        <PaginationItem>
          <Link
            to={currentPage + 1 > maxPage ? "" : `?page=${currentPage + 1}`}
          >
            <Button
              variant={"ghost"}
              disabled={currentPage + 1 > maxPage}
              onClick={() => {
                setPage(Number(currentPage + 1));
              }}
            >
              Next <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
