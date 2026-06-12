export function AtlasVisual({
  focus = "vela atlas",
  compact = false,
}: {
  focus?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`atlas-visual${compact ? " atlas-visual--compact" : ""}`}
      role="img"
      aria-label={`${focus} vehicle intelligence preview`}
    >
      <span className="atlas-visual__grid" aria-hidden="true" />
      <svg
        className="atlas-visual__vehicle"
        viewBox="0 0 640 420"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="atlas-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e7e4dc" />
            <stop offset="0.52" stopColor="#8b9497" />
            <stop offset="1" stopColor="#30383c" />
          </linearGradient>
          <radialGradient id="atlas-glass">
            <stop offset="0" stopColor="#9fc1ce" stopOpacity=".8" />
            <stop offset="1" stopColor="#172328" stopOpacity=".96" />
          </radialGradient>
        </defs>
        <path
          className="atlas-visual__scan atlas-visual__scan--rear"
          d="M250 206 L36 80 L48 338 Z"
        />
        <path
          className="atlas-visual__scan atlas-visual__scan--front"
          d="M390 207 L604 58 L620 356 Z"
        />
        <path
          className="atlas-visual__scan atlas-visual__scan--side"
          d="M320 236 L120 394 L520 394 Z"
        />
        <path
          d="M204 116 C238 74 402 74 436 116 L478 190 L470 314 C466 350 432 374 394 382 L246 382 C208 374 174 350 170 314 L162 190 Z"
          fill="url(#atlas-body)"
          stroke="rgba(236,245,247,.68)"
          strokeWidth="2"
        />
        <path
          d="M233 124 C260 100 380 100 407 124 L432 188 L208 188 Z"
          fill="url(#atlas-glass)"
          stroke="rgba(205,230,237,.35)"
          strokeWidth="2"
        />
        <path
          d="M209 213 C250 196 390 196 431 213 L440 310 C404 333 236 333 200 310 Z"
          fill="rgba(27,35,39,.28)"
          stroke="rgba(255,255,255,.12)"
        />
        <rect x="253" y="88" width="134" height="14" rx="7" fill="#111719" />
        <circle cx="274" cy="95" r="4.5" fill="#79c5dd" />
        <circle cx="320" cy="95" r="4.5" fill="#79c5dd" />
        <circle cx="366" cy="95" r="4.5" fill="#79c5dd" />
        <rect x="286" y="174" width="68" height="12" rx="6" fill="#111719" />
        <circle cx="320" cy="180" r="5" fill="#9ed8e8" />
        <circle cx="184" cy="245" r="7" fill="#84c9dc" />
        <circle cx="456" cy="245" r="7" fill="#84c9dc" />
        <circle cx="230" cy="344" r="6" fill="#84c9dc" />
        <circle cx="410" cy="344" r="6" fill="#84c9dc" />
        <path d="M176 266 H142" stroke="#96d7e8" strokeWidth="3" />
        <path d="M464 266 H498" stroke="#96d7e8" strokeWidth="3" />
      </svg>
      <div className="atlas-visual__readout atlas-visual__readout--primary">
        <p>atlas guardian</p>
        <strong>360°</strong>
        <span>sensor fusion active</span>
      </div>
      <div className="atlas-visual__readout atlas-visual__readout--secondary">
        <p>vOS 27 mobility</p>
        <strong>{focus}</strong>
        <span>coming 2027</span>
      </div>
      <div className="atlas-visual__status">
        <span />
        camera · radar · lidar · network
      </div>
    </div>
  );
}
