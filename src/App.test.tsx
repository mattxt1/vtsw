import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

vi.mock("./components/SceneStage", () => ({
  SceneStage: ({ label }: { label: string }) => <div>{label}</div>,
}));

describe("application routes", () => {
  it("renders the company hub and its brands", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /we make the everyday/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore Ora" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore Morrow" }),
    ).toBeInTheDocument();
  });

  it("renders a direct brand route with adjacent navigation", () => {
    render(
      <MemoryRouter initialEntries={["/brands/morrow"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Good food for the days ahead." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "More brands" })).toBeInTheDocument();
  });

  it("renders the not-found experience", () => {
    render(
      <MemoryRouter initialEntries={["/missing"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "This field is still empty." }),
    ).toBeInTheDocument();
  });
});
