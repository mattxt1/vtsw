import type { ProductPlaceholderKind } from "../components/ProductPlaceholder";
import type { CatalogProduct } from "../types/content";

export type ProductRenderKind =
  | "phone"
  | "foldable"
  | "notebook"
  | "tablet"
  | "watch"
  | "earbuds"
  | "display"
  | "speaker"
  | "accessory";

export function getProductRenderKind(
  product: CatalogProduct,
): ProductRenderKind | undefined {
  const model = product.model.toLowerCase();
  const group = product.groupName.toLowerCase();

  if (product.segmentId === "mobile") {
    return group.includes("fold") ||
      model.includes("fold") ||
      model.includes("flip") ||
      model.includes("trifold")
      ? "foldable"
      : "phone";
  }
  if (product.segmentId === "accessories") return "accessory";
  if (model.includes("notebook")) return "notebook";
  if (model.startsWith("tab ")) return "tablet";
  if (model.startsWith("pencil")) return "accessory";
  if (model.includes("watch") || model === "ring") return "watch";
  if (model.includes("probuds") || model === "xr") return "earbuds";
  if (product.segmentId === "display") return "display";
  if (product.segmentId === "audio") return "speaker";
  return undefined;
}

export function getProductVisualKind(
  product: CatalogProduct,
): ProductPlaceholderKind {
  const renderKind = getProductRenderKind(product);

  if (renderKind === "foldable") return "phone";
  if (renderKind === "earbuds" || renderKind === "speaker") return "audio";
  if (renderKind === "display") return "tv";
  return renderKind ?? "software";
}
