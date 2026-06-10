import type { ReactNode } from "react";
import { usePointerSurface } from "../hooks/usePointerSurface";

export function TactileCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const pointer = usePointerSurface<HTMLDivElement>();

  return (
    <div className={`tactile-card ${className}`} {...pointer}>
      <span className="tactile-card__shine" aria-hidden="true" />
      <div className="tactile-card__content">{children}</div>
    </div>
  );
}
