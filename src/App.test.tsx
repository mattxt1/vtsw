import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

vi.mock("./components/SceneStage", () => ({
  SceneStage: ({ label }: { label: string }) => <div>{label}</div>,
}));

describe("vela experience", () => {
  it("renders the consumer technology story and product ecosystem", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /technology,.*naturally connected/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Everything you use. Designed together." }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("phone").length).toBeGreaterThan(0);
    expect(screen.getAllByText("laptop").length).toBeGreaterThan(0);
    expect(screen.getByText("accessories")).toBeInTheDocument();
  });

  it("exposes the primary ecosystem sections through navigation", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(navigation).toHaveTextContent("products");
    expect(navigation).toHaveTextContent("ecosystem");
    expect(navigation).toHaveTextContent("software");
    expect(screen.getByText("by veritas")).toBeInTheDocument();
  });

  it("renders the not-found experience", () => {
    render(
      <MemoryRouter initialEntries={["/missing"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "This device is out of range." }),
    ).toBeInTheDocument();
  });
});
