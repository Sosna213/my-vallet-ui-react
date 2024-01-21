export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
  needsAuthentication: boolean;
};

export type ResultWithPagination<TItem, TFacets> = {
  items: TItem[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  facets?: TFacets
};

export type PaginatorInput = {
 currentPage: number;
 setPage: React.Dispatch<React.SetStateAction<number>>;
 maxPage: number
}
