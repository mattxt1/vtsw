import type { CSSProperties } from "react";
import type { Brand } from "../types/content";

export function BrandMark({
  brand,
  size = "large",
}: {
  brand: Brand;
  size?: "small" | "large";
}) {
  return (
    <div
      className={`brand-mark brand-mark--${size}`}
      style={{ "--brand-accent": brand.theme.accent } as CSSProperties}
      aria-hidden="true"
    >
      <span>{brand.monogram}</span>
    </div>
  );
}
