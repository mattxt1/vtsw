import type { PointerEvent } from "react";

export function usePointerSurface<T extends HTMLElement>() {
  function onPointerMove(event: PointerEvent<T>) {
    if (event.pointerType === "touch") return;

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    element.style.setProperty("--pointer-x", `${x * 100}%`);
    element.style.setProperty("--pointer-y", `${y * 100}%`);
    element.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
    element.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
  }

  function onPointerLeave(event: PointerEvent<T>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return { onPointerMove, onPointerLeave };
}
