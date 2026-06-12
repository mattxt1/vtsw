export function FoundationVisual({
  focus,
  compact = false,
}: {
  focus?: string;
  compact?: boolean;
}) {
  const normalizedFocus = focus?.toLowerCase() ?? "";
  const layers = [
    {
      id: "vos",
      eyebrow: "adaptive system",
      name: normalizedFocus.includes("vos") ? focus : "vOS 27",
      detail: "One experience across every supported screen.",
    },
    {
      id: "ethos",
      eyebrow: "native intelligence",
      name: normalizedFocus.includes("ethos") ? focus : "ethos ai",
      detail: "Private context, accelerated on vela silicon.",
    },
    {
      id: "lattice",
      eyebrow: "framework layer",
      name: normalizedFocus.includes("lattice") ? focus : "lattice 1",
      detail: "Interfaces, services, security, and deployment.",
    },
  ];

  return (
    <div
      className={`foundation-visual${compact ? " foundation-visual--compact" : ""}`}
      role="img"
      aria-label="vOS, ethos ai, and lattice foundation layers"
    >
      <span className="foundation-visual__mesh" aria-hidden="true" />
      <div className="foundation-visual__rail" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {layers.map((layer, index) => (
        <div
          className={`foundation-visual__panel foundation-visual__panel--${index + 1}`}
          key={layer.id}
        >
          <p>{layer.eyebrow}</p>
          <strong>{layer.name}</strong>
          {!compact && <span>{layer.detail}</span>}
          <i aria-hidden="true" />
        </div>
      ))}
      <div className="foundation-visual__status">
        <span />
        vela foundation / active
      </div>
    </div>
  );
}
