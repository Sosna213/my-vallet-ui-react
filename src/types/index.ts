export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
  needsAuthentication: boolean;
};

export type ResultWithPagination<T> = {
  items: T[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type PaginatorInput = {
 currentPage: number;
 setPage: React.Dispatch<React.SetStateAction<number>>;
 maxPage: number
}
