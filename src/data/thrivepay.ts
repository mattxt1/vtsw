import type { CartItem } from "../types/store";

export interface ThrivePayPlan {
  terms: number[];
  defaultTerm: number;
  defaultDownPayment: number;
  maximumDownPayment: number;
  categoryLabel: string;
}

function itemCategory(item: CartItem) {
  const [segmentId] = item.productKey.split(":");
  const name = item.productName.toLowerCase();

  if (segmentId === "accessories") return "accessories";
  if (segmentId === "mobile") return "phones";
  if (segmentId === "wearables") return "wearables";
  if (segmentId === "audio") return "audio";
  if (segmentId === "atlas") return "atlas";
  if (name.includes("notebook")) return "notebooks";
  if (name.includes("tab ")) return "tablets";
  if (name.includes("projector")) return "projectors";
  if (name.includes("tv ")) return "tvs";
  if (name.includes("display")) return "displays";
  return "devices";
}

function termsForCategory(category: string, subtotal: number) {
  switch (category) {
    case "accessories":
      return subtotal < 199 ? [3, 6] : [3, 6, 12];
    case "phones":
    case "tablets":
    case "wearables":
      return [12, 18, 24];
    case "notebooks":
    case "displays":
    case "projectors":
      return [12, 24, 36];
    case "tvs":
      return [12, 24, 36, 48];
    case "audio":
      return [6, 12, 24];
    case "atlas":
      return [24, 36, 48, 60];
    default:
      return [12, 24];
  }
}

function chooseDefaultTerm(categories: string[], terms: number[]) {
  if (categories.includes("atlas")) return terms.includes(36) ? 36 : terms.at(-1)!;
  if (categories.includes("tvs")) return terms.includes(36) ? 36 : terms.at(-1)!;
  if (categories.includes("notebooks")) {
    return terms.includes(36) ? 36 : terms.at(-1)!;
  }
  if (terms.includes(24)) return 24;
  if (terms.includes(6)) return 6;
  return terms.at(-1) ?? 12;
}

export function getThrivePayPlan(
  items: CartItem[],
  subtotal: number,
): ThrivePayPlan {
  const categories = [...new Set(items.map(itemCategory))];
  const majorCategories = categories.filter(
    (category) => category !== "accessories",
  );
  const controllingCategory =
    majorCategories[0] ?? categories[0] ?? "devices";
  const terms = termsForCategory(controllingCategory, subtotal);
  const downRate = subtotal < 1000 ? 0.1 : subtotal < 3000 ? 0.15 : 0.2;

  return {
    terms,
    defaultTerm: chooseDefaultTerm(majorCategories, terms),
    defaultDownPayment: Math.round(subtotal * downRate),
    maximumDownPayment: Math.floor(subtotal * 0.9),
    categoryLabel:
      majorCategories.length > 1
        ? "eligible vela devices"
        : controllingCategory,
  };
}

export function calculateThrivePayPayment(
  subtotal: number,
  downPayment: number,
  term: number,
) {
  const normalizedDownPayment = Math.min(
    Math.max(0, downPayment),
    Math.floor(subtotal * 0.9),
  );
  const financedAmount = Math.max(0, subtotal - normalizedDownPayment);

  return {
    downPayment: normalizedDownPayment,
    financedAmount,
    monthlyPayment: term > 0 ? financedAmount / term : 0,
  };
}
