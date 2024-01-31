import { useSearchParams } from "react-router-dom";

interface UsePaginationParams {
  maxPage: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const usePagination = ({
  maxPage,
  currentPage,
  setPage,
}: UsePaginationParams) => {
  const setSearchParams = useSearchParams()[1];

  const array = [...Array(maxPage).keys()].map((val) => val + 1);
  const index = array.indexOf(currentPage);

  const start = Math.max(0, index - 1);
  const end = Math.min(array.length - 1, index + 1);

  const pages = array.slice(start, end + 1);

  const handleButtonClick = (page: number) => {
    setSearchParams({ page: page.toString() });
    setPage(page);
  };

  return {
    pages,
    handleButtonClick,
  };
};
