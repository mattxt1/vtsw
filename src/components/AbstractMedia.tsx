import type { MediaAsset } from "../types/content";

export function AbstractMedia({
  media,
  variant = 0,
}: {
  media: MediaAsset;
  variant?: number;
}) {
  return (
    <div
      className={`abstract-media abstract-media--${variant % 4}`}
      role="img"
      aria-label={media.alt}
    >
      <span className="abstract-media__orb abstract-media__orb--one" />
      <span className="abstract-media__orb abstract-media__orb--two" />
      <span className="abstract-media__line" />
    </div>
  );
}
