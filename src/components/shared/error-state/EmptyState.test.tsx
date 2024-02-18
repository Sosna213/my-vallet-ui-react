import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "..";
import "@testing-library/jest-dom/vitest";

describe("EmptyState", () => {
  it("should render the empty state title", () => {
    render(<EmptyState title="Empty State" message="No data found" />);

    expect(
      screen.getByTestId("empty-title-message-container")
    ).toHaveTextContent("Empty State");
  });
  
  it("should render the empty state message", () => {
    render(<EmptyState title="Empty State" message="No data found" />);

    expect(
      screen.getByTestId("empty-state-message-container")
    ).toHaveTextContent("No data found");
  });
});
