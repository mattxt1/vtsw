import { describe, expect, it } from "vitest";
import { catalogProducts, getProduct, segments } from "./catalog";
import { vela } from "./vela";

describe("vela content", () => {
  it("keeps brand naming lowercase and covers the core ecosystem", () => {
    expect(vela.name).toBe("vela");
    expect(vela.parent).toBe("veritas");
    expect(vela.products.map((product) => product.id)).toEqual(
      expect.arrayContaining([
        "mobile",
        "computing",
        "wearables",
        "display",
        "audio",
        "accessories",
        "platform",
      ]),
    );
  });

  it("keeps product and chapter identifiers unique", () => {
    expect(new Set(vela.products.map((product) => product.id)).size).toBe(
      vela.products.length,
    );
    expect(new Set(vela.chapters.map((chapter) => chapter.id)).size).toBe(
      vela.chapters.length,
    );
  });

  it("includes the current flagship, foldable, display, and silicon families", () => {
    const models = vela.products.flatMap((product) =>
      product.groups.flatMap((group) => group.models),
    );

    expect(models).toEqual(
      expect.arrayContaining([
        "x26 Ultra",
        "Trifold Ultra",
        "tab t26 Ultra",
        "notebook ultra",
        "watch ultra",
        "tv ultra",
        "projector ultra",
        "home speaker pro",
        "d8 ultra",
        "m8 max",
        "lattice 1 mini",
        "lattice 1",
        "lattice 1 pro",
        "ethos ai",
        "vOS 27",
        "vOS 26",
        "vela protect",
      ]),
    );
  });

  it("places lattice and ethos ai inside the vela foundation", () => {
    const foundation = vela.products.find((product) => product.id === "platform");
    const models =
      foundation?.groups.flatMap((group) => group.models) ?? [];

    expect(foundation?.name).toBe("software + foundation");
    expect(models).toEqual(
      expect.arrayContaining([
        "lattice 1 mini",
        "lattice 1",
        "lattice 1 pro",
        "ethos ai",
      ]),
    );
    expect(getProduct("platform", "lattice-1")?.displayName).toBe("lattice 1");
    expect(getProduct("platform", "ethos-ai")?.displayName).toBe("ethos ai");
    expect(getProduct("platform", "vos-27")?.displayName).toBe("vOS 27");
  });

  it("includes the complete 2026 accessory ecosystem", () => {
    const accessories = vela.products.find(
      (product) => product.id === "accessories",
    );
    const models =
      accessories?.groups.flatMap((group) => group.models) ?? [];

    expect(models).toHaveLength(134);
    expect(models).toEqual(
      expect.arrayContaining([
        "x26 silicone case",
        "tab t26 ultra keyboard studio",
        "dock ultra",
        "magnetic travel charger trio",
        "titanium link band",
        "zero-gap wall mount",
        "camera grip",
        "teacher presentation kit",
      ]),
    );
  });

  it("creates a unique discover route for every model in the lineup", () => {
    const expectedCount = segments.reduce(
      (total, segment) =>
        total +
        segment.groups.reduce(
          (segmentTotal, group) => segmentTotal + group.models.length,
          0,
        ),
      0,
    );
    const routes = catalogProducts.map(
      (product) => `${product.segmentId}/${product.id}`,
    );

    expect(catalogProducts).toHaveLength(expectedCount);
    expect(new Set(routes).size).toBe(expectedCount);
    expect(getProduct("mobile", "x26-ultra")?.displayName).toBe(
      "vela x26 Ultra",
    );
  });

  it("gives every discovery page detailed, price-free product content", () => {
    for (const product of catalogProducts) {
      expect(
        product.highlights.length,
        product.displayName,
      ).toBeGreaterThanOrEqual(3);
      expect(
        product.specifications.length,
        product.displayName,
      ).toBeGreaterThanOrEqual(1);
      expect(JSON.stringify(product)).not.toMatch(/\$\s?\d/);
    }
  });
});
