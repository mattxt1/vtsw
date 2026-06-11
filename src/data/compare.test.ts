import { describe, expect, it } from "vitest";
import { getProduct } from "./catalog";
import {
  buildComparisonSections,
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
});
