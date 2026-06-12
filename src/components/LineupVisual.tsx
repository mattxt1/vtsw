import type { CatalogProduct } from "../types/content";
import { getProductRenderKind } from "../utils/productVisual";
import { ProductRender } from "./ProductRender";

function selectRepresentatives(products: CatalogProduct[]) {
  const representatives: CatalogProduct[] = [];
  const kinds = new Set<string>();

  for (const product of products) {
    const kind = getProductRenderKind(product);
    if (kind && !kinds.has(kind)) {
      representatives.push(product);
      kinds.add(kind);
    }
    if (representatives.length === 3) return representatives;
  }

  for (const product of products) {
    if (!representatives.includes(product)) representatives.push(product);
    if (representatives.length === 3) break;
  }

  return representatives;
}

export function LineupVisual({
  products,
  label,
}: {
  products: CatalogProduct[];
  label: string;
}) {
  const representatives = selectRepresentatives(products);

  return (
    <div className="lineup-visual" role="group" aria-label={label}>
      <span className="lineup-visual__ambient" aria-hidden="true" />
      {representatives.map((product, index) => (
        <div
          className={`lineup-visual__item lineup-visual__item--${index + 1}`}
          key={product.id}
        >
          <ProductRender
            product={product}
            finishColor={product.finishes[index]?.color}
            finishName={product.finishes[index]?.name}
            priority={index === 0}
            variant={index}
          />
          <span>{product.displayName}</span>
        </div>
      ))}
    </div>
  );
}
