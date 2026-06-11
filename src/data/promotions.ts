export interface ProductPromotion {
  productKey: string;
  label: string;
  headline: string;
  savings: number;
}

export const premiumEventPromotions: ProductPromotion[] = [
  {
    productKey: "mobile:x26-pro",
    label: "premium event",
    headline: "Save on vela x26 Pro.",
    savings: 150,
  },
  {
    productKey: "computing:tab-t26-ultra",
    label: "premium event",
    headline: "Save on vela tab t26 Ultra.",
    savings: 200,
  },
  {
    productKey: "wearables:watch-ultra",
    label: "premium event",
    headline: "Save on vela watch ultra.",
    savings: 100,
  },
];

const promotionsByKey = new Map(
  premiumEventPromotions.map((promotion) => [
    promotion.productKey,
    promotion,
  ]),
);

export function getProductPromotion(productKey: string) {
  return promotionsByKey.get(productKey);
}

