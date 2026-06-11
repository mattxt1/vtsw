export type ProductPlaceholderKind =
  | "phone"
  | "notebook"
  | "tablet"
  | "watch"
  | "audio"
  | "tv"
  | "software";

export function ProductPlaceholder({
  kind,
  label,
  tone = "light",
}: {
  kind: ProductPlaceholderKind;
  label: string;
  tone?: "light" | "dark" | "blue";
}) {
  return (
    <div
      className={`product-placeholder product-placeholder--${kind} product-placeholder--${tone}`}
      role="img"
      aria-label={`${label} placeholder product image`}
    >
      <span className="product-placeholder__glow" aria-hidden="true" />
      <div className="product-placeholder__object" aria-hidden="true">
        <span className="product-placeholder__screen">
          <i />
          <i />
          <i />
        </span>
        <span className="product-placeholder__detail" />
        <span className="product-placeholder__base" />
      </div>
      <span className="product-placeholder__caption">{label}</span>
    </div>
  );
}
