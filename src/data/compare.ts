import type { CatalogProduct } from "../types/content";
import { catalogProducts, getSegment } from "./catalog";
import { historicalProducts } from "./historicalProducts";
export { getProductKey } from "./productKey";

export const MAX_COMPARE_PRODUCTS = 3;
export const comparisonProducts = [...catalogProducts, ...historicalProducts];

export interface ComparisonRow {
  label: string;
  values: Array<string | undefined>;
  status: "shared" | "different" | "specific";
}

export interface ComparisonSection {
  title: string;
  rows: ComparisonRow[];
}

export function parseComparisonProducts(value: string | null) {
  if (!value) return [];

  const uniqueKeys = [...new Set(value.split(",").filter(Boolean))].slice(
    0,
    MAX_COMPARE_PRODUCTS,
  );

  return uniqueKeys.flatMap((key) => {
    const [segmentId, productId] = key.split(":");
    const product = comparisonProducts.find(
      (item) => item.segmentId === segmentId && item.id === productId,
    );
    return product ? [product] : [];
  });
}

function normalizeValue(value: string | undefined) {
  return value?.trim().toLowerCase().replace(/\s+/g, " ");
}

function getRowStatus(values: Array<string | undefined>): ComparisonRow["status"] {
  if (values.some((value) => !value)) return "specific";

  const normalized = values.map(normalizeValue);
  return normalized.every((value) => value === normalized[0])
    ? "shared"
    : "different";
}

function createRow(
  label: string,
  values: Array<string | undefined>,
): ComparisonRow {
  return {
    label,
    values,
    status: getRowStatus(values),
  };
}

function keepRow(row: ComparisonRow, differencesOnly: boolean) {
  return !differencesOnly || row.status !== "shared";
}

export function buildComparisonSections(
  products: CatalogProduct[],
  differencesOnly = false,
): ComparisonSection[] {
  if (products.length === 0) return [];

  const overviewRows = [
    createRow(
      "Category",
      products.map(
        (product) => getSegment(product.segmentId)?.name ?? product.segmentId,
      ),
    ),
    createRow(
      "Family",
      products.map((product) => product.groupName),
    ),
    createRow(
      "Generation",
      products.map((product) => product.year?.toString()),
    ),
    createRow(
      "Platform",
      products.map((product) => product.platform),
    ),
    createRow(
      "Software support",
      products.map((product) => product.support),
    ),
    createRow(
      "Availability",
      products.map((product) => product.availability),
    ),
  ].filter((row) => keepRow(row, differencesOnly));

  const groupTitles = [
    ...new Set(
      products.flatMap((product) =>
        product.specifications.map((group) => group.title),
      ),
    ),
  ];

  const technicalSections = groupTitles.flatMap((title) => {
    const labels = [
      ...new Set(
        products.flatMap(
          (product) =>
            product.specifications
              .find((group) => group.title === title)
              ?.items.map((item) => item.label) ?? [],
        ),
      ),
    ];

    const rows = labels
      .map((label) =>
        createRow(
          label,
          products.map(
            (product) =>
              product.specifications
                .find((group) => group.title === title)
                ?.items.find((item) => item.label === label)?.value,
          ),
        ),
      )
      .filter((row) => keepRow(row, differencesOnly));

    return rows.length > 0 ? [{ title, rows }] : [];
  });

  return [
    ...(overviewRows.length > 0
      ? [{ title: "Overview", rows: overviewRows }]
      : []),
    ...technicalSections,
  ];
}

export function getComparisonSummary(products: CatalogProduct[]) {
  if (products.length === 0) {
    return "Choose up to three vela devices to begin.";
  }

  if (products.length === 1) {
    return `Add another device to compare with ${products[0].displayName}.`;
  }

  const sameSegment = products.every(
    (product) => product.segmentId === products[0].segmentId,
  );
  const sameGroup = products.every(
    (product) => product.groupName === products[0].groupName,
  );
  const sharedPlatform = products.every(
    (product) => product.platform === products[0].platform,
  );
  const historicalProducts = products.filter((product) => product.archive);
  const spansGenerations =
    new Set(products.map((product) => product.year)).size > 1;

  if (sameGroup) {
    if (spansGenerations || historicalProducts.length > 0) {
      return `A generational view of the ${products[0].groupName}. Hardware, software, and support changes stay aligned so the evolution is easy to read.`;
    }
    return `A close comparison within the ${products[0].groupName}. Shared foundations stay visible while capability and design differences come forward.`;
  }

  if (sameSegment) {
    return `These devices serve the same part of the vela ecosystem from different design priorities${sharedPlatform ? `, while sharing ${products[0].platform}` : ""}.`;
  }

  return "A cross-category view. Category-specific rows are marked so specialized capabilities are not mistaken for missing features.";
}
