import type { ProductPlaceholderKind } from "../components/ProductPlaceholder";
import type { CatalogProduct } from "../types/content";

export function getProductVisualKind(
  product: CatalogProduct,
): ProductPlaceholderKind {
  const model = product.model.toLowerCase();

  if (product.segmentId === "mobile") return "phone";
  if (model.includes("notebook")) return "notebook";
  if (model.startsWith("tab ") || model.startsWith("pencil")) return "tablet";
  if (model.includes("watch") || model === "ring") return "watch";
  if (
    product.segmentId === "audio" ||
    model.includes("probuds") ||
    model === "xr"
  ) {
    return "audio";
  }
  if (product.segmentId === "display") return "tv";
  return "software";
}
