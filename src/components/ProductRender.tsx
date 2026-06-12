import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import type { CatalogProduct } from "../types/content";
import {
  getProductRenderKind,
  type ProductRenderKind,
} from "../utils/productVisual";

const renderSources: Record<ProductRenderKind, string> = {
  phone: "/assets/product-renders/phone.jpg",
  foldable: "/assets/product-renders/foldable.jpg",
  notebook: "/assets/product-renders/notebook.jpg",
  tablet: "/assets/product-renders/tablet.jpg",
  watch: "/assets/product-renders/watch.jpg",
  earbuds: "/assets/product-renders/earbuds.jpg",
  display: "/assets/product-renders/display.jpg",
  speaker: "/assets/product-renders/speaker.jpg",
  accessory: "/assets/product-renders/accessories.jpg",
};

function getProductVariant(product: CatalogProduct) {
  return [...product.id].reduce((total, character) => {
    return total + character.charCodeAt(0);
  }, 0) % 4;
}

export function ProductRender({
  product,
  kind,
  label,
  finishColor = "#8d969a",
  finishName,
  priority = false,
  variant,
}: {
  product?: CatalogProduct;
  kind?: ProductRenderKind;
  label?: string;
  finishColor?: string;
  finishName?: string;
  priority?: boolean;
  variant?: number;
}) {
  const renderKind = product ? getProductRenderKind(product) : kind;
  const renderLabel = product?.displayName ?? label;

  if (!renderKind || !renderLabel) return null;

  const resolvedVariant = variant ?? (product ? getProductVariant(product) : 0);
  const style = {
    "--render-finish": finishColor,
  } as CSSProperties;
  const finishKey = `${renderKind}-${finishColor}-${finishName ?? "default"}`;

  return (
    <div
      className={`product-render product-render--${renderKind} product-render--variant-${resolvedVariant % 4}`}
      style={style}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={finishKey}
          src={renderSources[renderKind]}
          alt={
            finishName
              ? `${renderLabel} shown in ${finishName}`
              : `${renderLabel} concept product render`
          }
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          initial={{ opacity: 0, scale: 1.018 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <motion.span
        key={`${finishKey}-finish`}
        className="product-render__finish"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.36 }}
      />
      <span className="product-render__sheen" aria-hidden="true" />
      <span className="product-render__caption">{renderLabel}</span>
    </div>
  );
}
