import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByText("x26 Ultra")).toBeInTheDocument();
    expect(screen.getByText("notebook ultra")).toBeInTheDocument();
    expect(screen.getByText("tv ultra")).toBeInTheDocument();
    expect(screen.getByText("vOS 26")).toBeInTheDocument();
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

  it("renders a segment showcase directly", () => {
    render(
      <MemoryRouter initialEntries={["/products/mobile"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "A phone for every way forward." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /vela x26 ultra/i }),
    ).toBeInTheDocument();
  });

  it("renders an individual product discovery page", () => {
    render(
      <MemoryRouter initialEntries={["/products/mobile/x26-ultra"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "vela x26 Ultra", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Product navigation" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Up to 3,800 nits").length).toBeGreaterThan(0);
    expect(
      screen.getByText("50MP 1-inch sensor with variable aperture"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Camera system" }),
    ).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\$\s?\d/);
    expect(screen.getAllByRole("link", { name: "Buy" })).toHaveLength(3);
  });

  it("renders the temporary store 404 for a valid product", () => {
    render(
      <MemoryRouter initialEntries={["/buy/mobile/x26-ultra"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "The store is not connected yet.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/vela x26 Ultra/)).toBeInTheDocument();
  });

  it("renders an intelligent three-device comparison", () => {
    render(
      <MemoryRouter initialEntries={["/compare"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "See what fits." }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
    expect(
      screen.getByRole("heading", { name: "vela x26 Ultra" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "vela x26 Pro" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", {
        name: "Device specification comparison",
      }),
    ).toBeInTheDocument();

    const differences = screen.getByRole("checkbox", {
      name: "Show differences only",
    });
    fireEvent.click(differences);

    expect(differences).toBeChecked();
    expect(
      screen.queryByRole("rowheader", { name: /Platform/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("rowheader", { name: /Peak brightness/ }),
    ).toBeInTheDocument();
  });

  it("starts a comparison from a single product URL", () => {
    render(
      <MemoryRouter
        initialEntries={["/compare?products=computing:notebook-ultra"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "vela notebook ultra" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
    expect(
      screen.getByText(/Add another device to compare/i),
    ).toBeInTheDocument();
  });
});
