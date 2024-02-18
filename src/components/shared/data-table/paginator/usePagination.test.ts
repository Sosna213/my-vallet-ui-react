import { afterEach, describe, expect, it, vi } from "vitest";
import { usePagination } from "./usePagination";
import { useSearchParams } from "react-router-dom";

vi.mock("react-router-dom");

describe("usePagination", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should return the correct pages [4,5,6] and handleButtonClick", () => {

    const maxPage = 10;
    const currentPage = 5;
    const setPageMock = vi.fn();

    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams, setSearchParamsMock]);

    const { pages, handleButtonClick } = usePagination({
      maxPage,
      currentPage,
      setPage: setPageMock,
    });
    
    expect(pages).toEqual([4, 5, 6]);

    handleButtonClick(3);
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: "3" });
    expect(setPageMock).toHaveBeenCalledWith(3);
  });
  it("should return the correct pages [1,2] and handleButtonClick", () => {

    const maxPage = 10;
    const currentPage = 1;
    const setPageMock = vi.fn();

    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams, setSearchParamsMock]);

    const { pages, handleButtonClick } = usePagination({
      maxPage,
      currentPage,
      setPage: setPageMock,
    });
    
    expect(pages).toEqual([1, 2]);

    handleButtonClick(2);
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: "2" });
    expect(setPageMock).toHaveBeenCalledWith(2);
  });
  it("should return the correct pages [9, 10] and handleButtonClick", () => {

    const maxPage = 10;
    const currentPage = 10;
    const setPageMock = vi.fn();

    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams, setSearchParamsMock]);

    const { pages, handleButtonClick } = usePagination({
      maxPage,
      currentPage,
      setPage: setPageMock,
    });
    
    expect(pages).toEqual([9, 10]);

    handleButtonClick(9);
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: "9" });
    expect(setPageMock).toHaveBeenCalledWith(9);
  });
});
