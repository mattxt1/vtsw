import { fireEvent, render, screen, within } from "@testing-library/react";
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
        name: /power,.*made quiet/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "More of the ecosystem, for less.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("From $949")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Built to work beautifully together.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "A studio you can close." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Everything feels closer." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "lattice" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ethos ai" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "The ecosystem, across the room." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Compare devices" }),
    ).toBeInTheDocument();
  });

  it("exposes the primary product families through navigation", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(navigation).toHaveTextContent("phones");
    expect(navigation).toHaveTextContent("notebooks");
    expect(navigation).toHaveTextContent("tablets");
    expect(navigation).toHaveTextContent("wearables");
    expect(navigation).toHaveTextContent("tv + home");
    expect(navigation).toHaveTextContent("accessories");
    expect(navigation).toHaveTextContent("software");
    expect(navigation).toHaveTextContent("compare");
    expect(navigation).toHaveTextContent("bag");
    expect(screen.queryByText("by veritas")).not.toBeInTheDocument();
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
    expect(screen.getByText("From $1,399")).toBeInTheDocument();
    expect(screen.getByText("From $949")).toBeInTheDocument();
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

  it("renders accessory discovery without store pricing", () => {
    render(
      <MemoryRouter
        initialEntries={["/products/accessories/x26-silicone-case"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "vela x26 silicone case",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/1.5 m drop protection/i).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText("vela x26").length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toMatch(/\$\s?\d/);
  });

  it("configures a product and adds it to the bag", async () => {
    render(
      <MemoryRouter initialEntries={["/buy/mobile/x26-ultra"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Make it yours.",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("$1,399").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("radio", { name: /1TB/i }));
    expect(screen.getAllByText("$1,799").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Add to bag/i }));
    expect(
      await screen.findByRole("heading", { name: "Your bag." }),
    ).toBeInTheDocument();
    expect(screen.getByText("1TB")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Made for your x26 Ultra." }),
    ).toBeInTheDocument();

    const caseCard = screen
      .getByRole("heading", { name: "vela x26 ultra silicone case" })
      .closest("article");
    expect(caseCard).not.toBeNull();
    fireEvent.click(
      within(caseCard as HTMLElement).getByRole("button", { name: /Add/i }),
    );
    expect(screen.getByLabelText("2 items")).toBeInTheDocument();
  });

  it("applies premium event pricing through configuration", () => {
    render(
      <MemoryRouter initialEntries={["/buy/mobile/x26-pro"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Now from")).toBeInTheDocument();
    expect(screen.getAllByText("$949").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$1,099").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("radio", { name: /1TB/i }));

    expect(screen.getByRole("heading", { name: "$1,399" })).toBeInTheDocument();
    expect(screen.getByText(/You save \$150/i)).toBeInTheDocument();
  });

  it("renders lattice as a vela foundation framework without store actions", () => {
    render(
      <MemoryRouter initialEntries={["/products/platform/lattice-1"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "lattice 1", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        "The standard production framework for vela software.",
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Buy" })).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore software + foundation" }),
    ).toBeInTheDocument();
  });

  it("renders ethos ai as the native vela intelligence layer", () => {
    render(
      <MemoryRouter initialEntries={["/products/platform/ethos-ai"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "ethos ai", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /combines vOS, vela silicon, and on-device intelligence/i,
      ).length,
    ).toBeGreaterThan(0);
  });

  it("renders an intelligent three-device comparison", async () => {
    render(
      <MemoryRouter initialEntries={["/compare"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "See what fits." }),
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

  it("starts a comparison from a single product URL", async () => {
    render(
      <MemoryRouter
        initialEntries={["/compare?products=computing:notebook-ultra"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "vela notebook ultra" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
    expect(
      screen.getByText(/Add another device to compare/i),
    ).toBeInTheDocument();
  });

  it("compares a current device with an archived generation", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/compare?products=mobile:x26-ultra,mobile:archive-x23-ultra-2023",
        ]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "vela x23 Ultra (2023)" }),
    ).toBeInTheDocument();
    expect(screen.getByText("archive 2023")).toBeInTheDocument();
    expect(screen.getByText("Followed by vela x24 Ultra")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Discover x23 Ultra/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/generational view/i)).toBeInTheDocument();
  });
});
