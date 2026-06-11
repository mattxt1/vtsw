import { describe, expect, it } from "vitest";
import { getProduct } from "./catalog";
import { getStoreConfiguration } from "./store";

function configuration(segmentId: string, productId: string) {
  const product = getProduct(segmentId, productId);
  if (!product) throw new Error(`Missing test product ${segmentId}/${productId}`);
  return getStoreConfiguration(product);
}

describe("vela store configurations", () => {
  it("uses documented flagship pricing and configuration deltas", () => {
    const store = configuration("mobile", "x26-ultra");
    const storage = store.optionGroups.find((group) => group.id === "storage");

    expect(store.basePrice).toBe(1399);
    expect(storage?.options).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "1tb",
          priceDelta: 400,
          detail: "24GB memory",
        }),
        expect.objectContaining({ id: "4tb", priceDelta: 1700 }),
      ]),
    );
  });

  it("maps exact television size pricing", () => {
    const store = configuration("display", "tv-ultra");
    const sizes = store.optionGroups.find((group) => group.id === "size");

    expect(store.basePrice).toBe(1799);
    expect(sizes?.options.find((option) => option.id === "85-inch"))
      .toMatchObject({ priceDelta: 10200 });
  });

  it("keeps organization products visible but outside consumer checkout", () => {
    const store = configuration("computing", "notebook-education-edition");

    expect(store.basePrice).toBe(699);
    expect(store.purchasable).toBe(false);
    expect(store.purchaseNote).toMatch(/organization sales/i);
  });
});
