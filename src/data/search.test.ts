import { describe, expect, it } from "vitest";
import { searchSite } from "./search";

describe("site search", () => {
  it("prioritizes exact product-name matches", () => {
    const results = searchSite("x26 ultra");

    expect(results[0]?.title).toBe("vela x26 Ultra");
    expect(results[0]?.url).toBe("/products/mobile/x26-ultra");
  });

  it("finds products through specifications and features", () => {
    const results = searchSite("1-inch sensor");

    expect(results.some((result) => result.title === "vela x26 Ultra")).toBe(
      true,
    );
  });

  it("includes category and site-page destinations", () => {
    expect(searchSite("compare")[0]?.url).toBe("/compare");
    expect(
      searchSite("phones").some(
        (result) => result.url === "/products/mobile",
      ),
    ).toBe(true);
  });

  it("returns no results when all query terms are not represented", () => {
    expect(searchSite("x26 classroom quantumbanana")).toHaveLength(0);
  });

  it("indexes atlas hardware, services, and mobility software", () => {
    expect(searchSite("vela atlas pro")[0]?.url).toBe(
      "/products/atlas/atlas-pro",
    );
    expect(
      searchSite("atlas pilot max").some(
        (result) => result.url === "/products/atlas/atlas-pilot-max",
      ),
    ).toBe(true);
    expect(
      searchSite("guardian collision").some(
        (result) => result.url === "/products/atlas/atlas-guardian",
      ),
    ).toBe(true);
  });
});
