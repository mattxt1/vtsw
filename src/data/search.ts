import { catalogProducts, segments } from "./catalog";

export type SearchResultType =
  | "page"
  | "category"
  | "product"
  | "accessory"
  | "software";

export interface SearchDocument {
  id: string;
  type: SearchResultType;
  title: string;
  eyebrow: string;
  description: string;
  url: string;
  searchableText: string;
}

export interface SearchResult extends SearchDocument {
  score: number;
}

const sitePages: Omit<SearchDocument, "searchableText">[] = [
  {
    id: "home",
    type: "page",
    title: "vela",
    eyebrow: "Company homepage",
    description:
      "Explore the latest vela devices, vOS 26, ethos ai, lattice, and the connected ecosystem.",
    url: "/",
  },
  {
    id: "compare",
    type: "page",
    title: "Compare devices",
    eyebrow: "Comparison",
    description:
      "Compare up to three current or previous-generation vela devices, specifications, and features.",
    url: "/compare",
  },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();
}

function createSearchableText(values: Array<string | number | undefined>) {
  return normalize(values.filter(Boolean).join(" "));
}

const pageDocuments: SearchDocument[] = sitePages.map((page) => ({
  ...page,
  searchableText: createSearchableText([
    page.title,
    page.eyebrow,
    page.description,
  ]),
}));

const categoryDocuments: SearchDocument[] = segments.map((segment) => ({
  id: `category:${segment.id}`,
  type: "category",
  title: segment.name,
  eyebrow: `${segment.eyebrow} lineup`,
  description: segment.description,
  url: `/products/${segment.id}`,
  searchableText: createSearchableText([
    segment.name,
    segment.eyebrow,
    segment.title,
    segment.description,
    segment.note,
    ...segment.groups.flatMap((group) => [group.name, ...group.models]),
  ]),
}));

const productDocuments: SearchDocument[] = catalogProducts.map((product) => {
  const type: SearchResultType =
    product.segmentId === "accessories"
      ? "accessory"
      : product.segmentId === "platform"
        ? "software"
        : "product";

  return {
    id: `product:${product.segmentId}:${product.id}`,
    type,
    title: product.displayName,
    eyebrow: `${product.groupName} · ${product.year ?? "current"}`,
    description: product.description,
    url: `/products/${product.segmentId}/${product.id}`,
    searchableText: createSearchableText([
      product.displayName,
      product.model,
      product.groupName,
      product.eyebrow,
      product.tagline,
      product.description,
      product.year,
      product.platform,
      product.support,
      product.availability,
      product.tier,
      ...product.features.flatMap((feature) => [
        feature.eyebrow,
        feature.title,
        feature.body,
      ]),
      ...product.highlights.flatMap((highlight) => [
        highlight.value,
        highlight.label,
      ]),
      ...product.specifications.flatMap((group) => [
        group.title,
        ...group.items.flatMap((item) => [item.label, item.value]),
      ]),
      ...product.finishes.map((finish) => finish.name),
    ]),
  };
});

export const searchDocuments: SearchDocument[] = [
  ...pageDocuments,
  ...categoryDocuments,
  ...productDocuments,
];

function scoreDocument(document: SearchDocument, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const title = normalize(document.title);
  const canonicalTitle = title.replace(/^vela /, "");
  const description = normalize(document.description);
  const eyebrow = normalize(document.eyebrow);
  const terms = normalizedQuery.split(" ").filter(Boolean);
  let score = 0;

  if (title === normalizedQuery) score += 140;
  if (canonicalTitle === normalizedQuery) score += 140;
  if (title.startsWith(normalizedQuery)) score += 90;
  if (canonicalTitle.startsWith(normalizedQuery)) score += 90;
  if (title.includes(normalizedQuery)) score += 55;
  if (eyebrow.includes(normalizedQuery)) score += 24;
  if (description.includes(normalizedQuery)) score += 16;
  if (document.searchableText.includes(normalizedQuery)) score += 22;

  for (const term of terms) {
    if (!document.searchableText.includes(term)) return 0;
    if (title.split(" ").some((word) => word === term)) score += 28;
    else if (title.includes(term)) score += 18;
    else if (eyebrow.includes(term)) score += 8;
    else score += 3;
  }

  if (document.type === "category") score += 4;
  if (document.type === "page") score += 2;

  return score;
}

export function searchSite(query: string, limit = Number.POSITIVE_INFINITY) {
  return searchDocuments
    .map((document) => ({
      ...document,
      score: scoreDocument(document, query),
    }))
    .filter((document) => document.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    )
    .slice(0, limit);
}
