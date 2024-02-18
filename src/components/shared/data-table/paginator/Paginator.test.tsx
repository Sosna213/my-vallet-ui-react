import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Paginator from "./Paginator";
import "@testing-library/jest-dom/vitest";

const mocks = vi.hoisted(() => {
  return {
    usePagination: vi.fn(),
  };
});

vi.mock("./usePagination", () => {
  return {
    usePagination: mocks.usePagination,
  };
});

describe("Paginator", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Renders paginator and has only one page and previous/next buttons disabled", () => {

    mocks.usePagination.mockReturnValue({
      pages: [1],
      handleButtonClick: vi.fn(),
    });

    const setPageMock = vi.fn();
    const pagination = {
      currentPage: 1,
      maxPage: 1,
      setPage: setPageMock,
    };

    render(<Paginator pagination={pagination} />);

    expect(screen.getAllByTestId("paginator-page-buttons").length).toBe(1);
    expect(
      screen.getAllByTestId("paginator-page-buttons")[0]
    ).toHaveTextContent("1");

    expect(screen.getByTestId("paginator-previous-button")).toBeDisabled();
    expect(screen.getByTestId("paginator-next-button")).toBeDisabled();
  });

  it("Renders paginator and has 4 pages current is 1 previous is disabled, next button enabled and works (has propper argument)", () => {
    const mockHandleButtonClick = vi.fn();

    mocks.usePagination.mockReturnValue({
      pages: [1, 2],
      handleButtonClick: mockHandleButtonClick,
    });

    const setPageMock = vi.fn();
    const pagination = {
      currentPage: 1,
      maxPage: 4,
      setPage: setPageMock,
    };

    render(<Paginator pagination={pagination} />);

    expect(screen.getAllByTestId("paginator-page-buttons").length).toBe(2);
    expect(
      screen.getAllByTestId("paginator-page-buttons")[0]
    ).toHaveTextContent("1");

    expect(screen.getByTestId("paginator-previous-button")).toBeDisabled();
    expect(screen.getByTestId("paginator-max-page-button")).toHaveTextContent("4");
    expect(screen.getByTestId("paginator-next-button")).toBeEnabled();

    fireEvent.click(screen.getByTestId("paginator-next-button"));
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(2);
  });

  it("Renders paginator and has 10 pages current is 10 next is disabled, previous button enabled and works (has propper argument)", () => {
    const mockHandleButtonClick = vi.fn();
    mocks.usePagination.mockReturnValue({
      pages: [9, 10],
      handleButtonClick: mockHandleButtonClick,
    });

    const setPageMock = vi.fn();
    const pagination = {
      currentPage: 10,
      maxPage: 10,
      setPage: setPageMock,
    };

    render(<Paginator pagination={pagination} />);

    expect(screen.getAllByTestId("paginator-page-buttons").length).toBe(2);

    expect(
      screen.getAllByTestId("paginator-page-buttons")[0]
    ).toHaveTextContent("9");

    expect(screen.getByTestId("paginator-min-page-button")).toHaveTextContent("1");
    expect(screen.getByTestId("paginator-next-button")).toBeDisabled();
    expect(screen.getByTestId("paginator-previous-button")).toBeEnabled();
    
    fireEvent.click(screen.getByTestId("paginator-previous-button"));
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(9);
  });

  it("Renders paginator and has 15 pages current is 5 next and previous button enabled and works (has propper argument)", () => {
    const mockHandleButtonClick = vi.fn();
    mocks.usePagination.mockReturnValue({
      pages: [4, 5, 6],
      handleButtonClick: mockHandleButtonClick,
    });

    const setPageMock = vi.fn();
    const pagination = {
      currentPage: 5,
      maxPage: 15,
      setPage: setPageMock,
    };

    render(<Paginator pagination={pagination} />);

    expect(screen.getAllByTestId("paginator-page-buttons").length).toBe(3);

    expect(
      screen.getAllByTestId("paginator-page-buttons")[1]
    ).toHaveTextContent("5");

    expect(screen.getByTestId("paginator-min-page-button")).toHaveTextContent("1");
    expect(screen.getByTestId("paginator-max-page-button")).toHaveTextContent("15");

    expect(screen.getByTestId("paginator-next-button")).toBeEnabled();
    expect(screen.getByTestId("paginator-previous-button")).toBeEnabled();
    
    fireEvent.click(screen.getByTestId("paginator-previous-button"));
    fireEvent.click(screen.getByTestId("paginator-next-button"));
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(2);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(4);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(6);
  });

  it("Renders paginator and has 10 pages current is 2 next and previous button enabled and works (has propper argument)", () => {
    const mockHandleButtonClick = vi.fn();
    mocks.usePagination.mockReturnValue({
      pages: [1, 2, 3],
      handleButtonClick: mockHandleButtonClick,
    });

    const setPageMock = vi.fn();
    const pagination = {
      currentPage: 2,
      maxPage: 10,
      setPage: setPageMock,
    };

    render(<Paginator pagination={pagination} />);

    expect(screen.getAllByTestId("paginator-page-buttons").length).toBe(3);

    expect(
      screen.getAllByTestId("paginator-page-buttons")[1]
    ).toHaveTextContent("2");

    expect(screen.getByTestId("paginator-max-page-button")).toHaveTextContent("10");

    expect(screen.getByTestId("paginator-next-button")).toBeEnabled();
    expect(screen.getByTestId("paginator-previous-button")).toBeEnabled();
    
    fireEvent.click(screen.getByTestId("paginator-previous-button"));
    fireEvent.click(screen.getByTestId("paginator-next-button"));
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(2);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(1);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(3);
  });

  it("Renders paginator and has 10 pages current is 9 next and previous button enabled and works (has propper argument)", () => {
    const mockHandleButtonClick = vi.fn();
    mocks.usePagination.mockReturnValue({
      pages: [8, 9, 10],
      handleButtonClick: mockHandleButtonClick,
    });

    const setPageMock = vi.fn();
    const pagination = {
      currentPage: 9,
      maxPage: 10,
      setPage: setPageMock,
    };

    render(<Paginator pagination={pagination} />);

    expect(screen.getAllByTestId("paginator-page-buttons").length).toBe(3);

    expect(
      screen.getAllByTestId("paginator-page-buttons")[1]
    ).toHaveTextContent("9");

    expect(screen.getByTestId("paginator-min-page-button")).toHaveTextContent("1");

    expect(screen.getByTestId("paginator-next-button")).toBeEnabled();
    expect(screen.getByTestId("paginator-previous-button")).toBeEnabled();
    
    fireEvent.click(screen.getByTestId("paginator-previous-button"));
    fireEvent.click(screen.getByTestId("paginator-next-button"));
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(2);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(10);
    expect(mockHandleButtonClick).toHaveBeenCalledWith(8);
  });
});
