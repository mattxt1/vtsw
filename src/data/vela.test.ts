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
        "vOS 26",
        "vela protect",
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
