import { describe, expect, it } from "vitest";
import { getAccessoryRecommendations } from "./accessoryRecommendations";
import { getProduct } from "./catalog";
import {
  getDefaultStoreSelections,
  getStoreConfiguration,
} from "./store";

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

  it("builds an atlas preorder preview without enabling checkout", () => {
    const store = configuration("atlas", "atlas-pro");
    const service = store.optionGroups.find((group) => group.id === "service");

    expect(store).toMatchObject({
      basePrice: 12999,
      purchasable: false,
    });
    expect(store.purchaseNote).toMatch(/preorders will start soon/i);
    expect(store.optionGroups.map((group) => group.id)).toEqual([
      "finish",
      "vehicle",
      "vehicle-year",
      "installation",
      "payment",
      "service",
      "additions",
    ]);
    expect(
      service?.options.find((option) => option.id === "atlas-pilot-max"),
    ).toMatchObject({ recurringPrice: 299 });
  });

  it("keeps atlas software and services outside the hardware configurator", () => {
    const store = configuration("atlas", "atlas-pilot-max");

    expect(store.optionGroups).toHaveLength(0);
    expect(store.purchaseNote).toMatch(/compatible atlas hardware/i);
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

  it("tailors four purchasable accessories to a flagship phone", () => {
    const phone = getProduct("mobile", "x26-ultra");
    if (!phone) throw new Error("Missing x26 Ultra");

    const recommendations = getAccessoryRecommendations(phone);

    expect(recommendations.map((product) => product.id)).toEqual([
      "x26-ultra-silicone-case",
      "x26-ultra-shield-glass-ultra",
      "magnetic-charger",
      "camera-grip",
    ]);
    expect(recommendations).toHaveLength(4);
  });

  it("builds a correctly priced default accessory selection", () => {
    const accessory = getProduct(
      "accessories",
      "tab-t26-ultra-keyboard-studio",
    );
    if (!accessory) throw new Error("Missing keyboard studio");

    const store = getStoreConfiguration(accessory);
    const selections = getDefaultStoreSelections(store);

    expect(selections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          groupId: "variant",
          optionLabel: "12.9-inch",
          priceDelta: 0,
        }),
      ]),
    );
  });
});
