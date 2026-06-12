import { describe, expect, it } from "vitest";
import type { CartItem } from "../types/store";
import {
  calculateThrivePayPayment,
  getThrivePayPlan,
} from "./thrivepay";

function item(productKey: string, productName: string): CartItem {
  return {
    id: productKey,
    productKey,
    productName,
    productRoute: "/buy/example",
    selections: [],
    unitPrice: 1000,
    quantity: 1,
  };
}

describe("thrivepay planning", () => {
  it("uses phone terms and the purchase-band down payment default", () => {
    const plan = getThrivePayPlan(
      [item("mobile:x26-ultra", "vela x26 Ultra")],
      1399,
    );

    expect(plan).toMatchObject({
      terms: [12, 18, 24],
      defaultTerm: 24,
      defaultDownPayment: 210,
      maximumDownPayment: 1259,
      categoryLabel: "phones",
    });
  });

  it("uses the major device term when accessories share a cart", () => {
    const plan = getThrivePayPlan(
      [
        item("computing:notebook-ultra", "vela notebook ultra"),
        item("accessories:notebook-sleeve", "vela notebook sleeve"),
      ],
      2998,
    );

    expect(plan.terms).toEqual([12, 24, 36]);
    expect(plan.defaultTerm).toBe(36);
  });

  it("offers short terms for an accessory-only purchase", () => {
    expect(
      getThrivePayPlan(
        [item("accessories:magnetic-charger", "vela magnetic charger")],
        99,
      ).terms,
    ).toEqual([3, 6]);
  });

  it("calculates a transparent zero-interest monthly estimate", () => {
    expect(calculateThrivePayPayment(1399, 199, 24)).toEqual({
      downPayment: 199,
      financedAmount: 1200,
      monthlyPayment: 50,
    });
  });

  it("caps custom down payments at ninety percent", () => {
    expect(calculateThrivePayPayment(1000, 999, 12)).toMatchObject({
      downPayment: 900,
      financedAmount: 100,
    });
  });
});
