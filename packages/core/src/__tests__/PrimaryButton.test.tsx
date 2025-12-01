import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../components/button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test");
  });
});
