import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AbstractMedia } from "./AbstractMedia";

const SceneCanvas = lazy(() => import("./three/SceneCanvas"));

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function SceneStage({
  accent,
  label,
}: {
  accent: string;
  label: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [enabled] = useState(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return !reduceMotion && canUseWebGL();
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) {
    return (
      <AbstractMedia
        media={{ kind: "image", alt: `${label} static fallback` }}
        variant={3}
      />
    );
  }

  return (
    <div ref={stageRef} className="scene-stage" role="img" aria-label={label}>
      <Suspense
        fallback={<div className="media-placeholder" aria-label="Loading scene" />}
      >
        <SceneCanvas accent={accent} active={visible} />
      </Suspense>
    </div>
  );
}
