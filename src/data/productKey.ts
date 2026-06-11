import type { CatalogProduct } from "../types/content";

export function getProductKey(product: CatalogProduct) {
  return `${product.segmentId}:${product.id}`;
}
