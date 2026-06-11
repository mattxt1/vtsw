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

  it("applies the premium event to the selected phone, tablet, and watch", () => {
    expect(configuration("mobile", "x26-pro")).toMatchObject({
      basePrice: 949,
      listPrice: 1099,
      promotionLabel: "premium event",
    });
    expect(configuration("computing", "tab-t26-ultra")).toMatchObject({
      basePrice: 1099,
      listPrice: 1299,
      promotionLabel: "premium event",
    });
    expect(configuration("wearables", "watch-ultra")).toMatchObject({
      basePrice: 749,
      listPrice: 849,
      promotionLabel: "premium event",
    });
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

  it("uses documented accessory pricing and variants", () => {
    const store = configuration(
      "accessories",
      "tab-t26-ultra-keyboard-studio",
    );
    const variants = store.optionGroups.find(
      (group) => group.id === "variant",
    );

    expect(store.basePrice).toBe(349);
    expect(variants?.options).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "12.9-inch", priceDelta: 0 }),
        expect.objectContaining({ label: "14.6-inch", priceDelta: 50 }),
      ]),
    );
    expect(store.protectOptions).toHaveLength(0);
  });
});
