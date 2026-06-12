import { describe, expect, it } from "vitest";
import { getProduct } from "./catalog";
import {
  buildComparisonSections,
  comparisonProducts,
  getComparisonSummary,
  parseComparisonProducts,
} from "./compare";

describe("vela comparison data", () => {
  it("parses unique valid products and enforces the three-device limit", () => {
    const products = parseComparisonProducts(
      [
        "mobile:x26-ultra",
        "mobile:x26-pro",
        "mobile:x26-ultra",
        "mobile:x26",
        "mobile:x25-se",
        "missing:device",
      ].join(","),
    );

    expect(products.map((product) => product.id)).toEqual([
      "x26-ultra",
      "x26-pro",
      "x26",
    ]);
  });

  it("marks shared, different, and category-specific comparison rows", () => {
    const products = [
      getProduct("mobile", "x26-ultra"),
      getProduct("mobile", "x26-pro"),
      getProduct("mobile", "x26"),
    ].flatMap((product) => (product ? [product] : []));
    const sections = buildComparisonSections(products);
    const rows = sections.flatMap((section) => section.rows);

    expect(
      rows.find((row) => row.label === "Platform")?.status,
    ).toBe("shared");
    expect(
      rows.find((row) => row.label === "Peak brightness")?.status,
    ).toBe("different");
    expect(
      rows.find((row) => row.label === "Depth")?.status,
    ).toBe("specific");
  });

  it("can reduce a comparison to meaningful differences", () => {
    const products = [
      getProduct("mobile", "x26-ultra"),
      getProduct("mobile", "x26-pro"),
    ].flatMap((product) => (product ? [product] : []));
    const sections = buildComparisonSections(products, true);
    const rows = sections.flatMap((section) => section.rows);

    expect(rows.some((row) => row.label === "Platform")).toBe(false);
    expect(rows.some((row) => row.label === "Peak brightness")).toBe(true);
    expect(getComparisonSummary(products)).toMatch(/close comparison/i);
  });

  it("resolves historical devices without adding them to the live catalog", () => {
    const products = parseComparisonProducts(
      "mobile:x26-ultra,mobile:archive-x23-ultra-2023",
    );

    expect(products).toHaveLength(2);
    expect(products[1]).toMatchObject({
      displayName: "vela x23 Ultra (2023)",
      year: 2023,
      archive: {
        status: "superseded",
        successor: "vela x24 Ultra",
      },
    });
    expect(getProduct("mobile", "archive-x23-ultra-2023")).toBeUndefined();
    expect(getComparisonSummary(products)).toMatch(/generational view/i);
  });

  it("contains distinct archive generations across every historical year", () => {
    const archive = comparisonProducts.filter((product) => product.archive);
    const keys = archive.map(
      (product) => `${product.segmentId}:${product.id}`,
    );

    expect(archive.length).toBeGreaterThanOrEqual(60);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(archive.map((product) => product.year))).toEqual(
      new Set([2023, 2024, 2025]),
    );
  });

  it("compares atlas hardware tiers through the shared comparison system", () => {
    const products = parseComparisonProducts(
      "atlas:atlas-core,atlas:atlas-pro,atlas:atlas-ultra",
    );
    const rows = buildComparisonSections(products).flatMap(
      (section) => section.rows,
    );

    expect(products.map((product) => product.displayName)).toEqual([
      "vela atlas core",
      "vela atlas pro",
      "vela atlas ultra",
    ]);
    expect(rows.find((row) => row.label === "Autonomy engine")?.status).toBe(
      "different",
    );
  });
});
