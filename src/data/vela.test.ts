import { describe, expect, it } from "vitest";
import { vela } from "./vela";

describe("vela content", () => {
  it("keeps brand naming lowercase and covers the core ecosystem", () => {
    expect(vela.name).toBe("vela");
    expect(vela.parent).toBe("veritas");
    expect(vela.products.map((product) => product.id)).toEqual(
      expect.arrayContaining(["phone", "laptop", "tablet", "watch", "home"]),
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
});
