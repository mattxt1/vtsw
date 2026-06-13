import type { CatalogProduct } from "../types/content";
import { catalogProducts, segments } from "./catalog";

export interface SitemapPageLink {
  title: string;
  description: string;
  path: string;
}

export const sitemapUtilityPages: SitemapPageLink[] = [
  {
    title: "Home",
    description: "The latest vela products, software, and ecosystem stories.",
    path: "/",
  },
  {
    title: "Compare",
    description: "Compare up to three current or archived vela devices.",
    path: "/compare",
  },
  {
    title: "Search",
    description: "Search products, accessories, software, and pages.",
    path: "/search",
  },
  {
    title: "Bag",
    description: "Review saved product configurations and accessories.",
    path: "/cart",
  },
  {
    title: "Checkout",
    description: "Review delivery and thrivepay payment options.",
    path: "/checkout",
  },
];

export function hasStoreRoute(product: CatalogProduct) {
  if (product.segmentId === "platform") return false;
  if (product.segmentId !== "atlas") return true;

  return (
    product.groupName === "consumer systems" ||
    product.groupName === "enterprise systems"
  );
}

export const sitemapProductCount = catalogProducts.length;

export const sitemapRouteCount =
  sitemapUtilityPages.length +
  1 +
  segments.length +
  catalogProducts.length +
  catalogProducts.filter(hasStoreRoute).length;

export const publicSitemapPaths = Array.from(
  new Set([
    "/",
    "/sitemap",
    "/compare",
    ...segments.map((segment) => `/products/${segment.id}`),
    ...catalogProducts.map(
      (product) => `/products/${product.segmentId}/${product.id}`,
    ),
    ...catalogProducts
      .filter(hasStoreRoute)
      .map((product) => `/buy/${product.segmentId}/${product.id}`),
  ]),
);
