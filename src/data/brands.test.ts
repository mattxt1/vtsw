import { describe, expect, it } from "vitest";
import { brands, getBrand } from "./brands";

describe("brand content", () => {
  it("keeps slugs unique and provides required presentation content", () => {
    expect(new Set(brands.map((brand) => brand.slug)).size).toBe(brands.length);

    for (const brand of brands) {
      expect(brand.name).toBeTruthy();
      expect(brand.statement).toBeTruthy();
      expect(brand.highlights.length).toBeGreaterThanOrEqual(3);
      expect(brand.chapters.length).toBeGreaterThanOrEqual(1);
      expect(brand.theme.accent).toMatch(/^#/);
    }
  });

  it("finds brands by slug and returns undefined for unknown slugs", () => {
    expect(getBrand("ora")?.name).toBe("Ora");
    expect(getBrand("unknown")).toBeUndefined();
  });
});
