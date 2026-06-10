import { useEffect, useRef } from "react";
import type { MediaAsset } from "../types/content";

interface SequenceCanvasProps {
  progress: number;
  accent: string;
  media: MediaAsset;
}

export function SequenceCanvas({
  progress,
  accent,
  media,
}: SequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  useEffect(() => {
    if (!media.framePath || !media.frameCount) return;

    const loadFrame = (index: number) => {
      if (index < 0 || index >= media.frameCount! || framesRef.current.has(index)) {
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.src = media.framePath!.replace(
        "{frame}",
        String(index + 1).padStart(4, "0"),
      );
      image.onload = () => {
        framesRef.current.set(index, image);
      };
    };

    loadFrame(0);
    const current = Math.round(progress * (media.frameCount - 1));
    for (let offset = -3; offset <= 3; offset += 1) {
      loadFrame(current + offset);
    }
  }, [media.frameCount, media.framePath, progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * dpr));
    const height = Math.max(1, Math.round(bounds.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cssWidth = width / dpr;
    const cssHeight = height / dpr;
    const centerX = cssWidth / 2;
    const centerY = cssHeight / 2;
    const phase = progress * Math.PI * 2;

    context.clearRect(0, 0, cssWidth, cssHeight);
    if (media.frameCount) {
      const frameIndex = Math.round(progress * (media.frameCount - 1));
      const image = framesRef.current.get(frameIndex);
      if (image) {
        const scale = Math.max(cssWidth / image.width, cssHeight / image.height);
        const imageWidth = image.width * scale;
        const imageHeight = image.height * scale;
        context.drawImage(
          image,
          (cssWidth - imageWidth) / 2,
          (cssHeight - imageHeight) / 2,
          imageWidth,
          imageHeight,
        );
        return;
      }
    }

    const backdrop = context.createRadialGradient(
      centerX,
      centerY,
      10,
      centerX,
      centerY,
      cssWidth * 0.6,
    );
    backdrop.addColorStop(0, `${accent}33`);
    backdrop.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = backdrop;
    context.fillRect(0, 0, cssWidth, cssHeight);

    context.save();
    context.translate(centerX, centerY);
    context.rotate(Math.sin(phase) * 0.16);
    const scaleX = 0.74 + Math.cos(phase) * 0.12;
    const scaleY = 0.92 + Math.sin(phase * 0.5) * 0.07;
    context.scale(scaleX, scaleY);

    const objectWidth = Math.min(cssWidth, cssHeight) * 0.46;
    const objectHeight = objectWidth * 1.28;
    const gradient = context.createLinearGradient(
      -objectWidth / 2,
      0,
      objectWidth / 2,
      0,
    );
    gradient.addColorStop(0, "#b9afa2");
    gradient.addColorStop(0.25, "#f4eee5");
    gradient.addColorStop(0.58, accent);
    gradient.addColorStop(0.82, "#f7f0e8");
    gradient.addColorStop(1, "#9f9487");

    context.shadowColor = "rgba(52, 42, 32, 0.28)";
    context.shadowBlur = 32;
    context.shadowOffsetY = 24;
    context.fillStyle = gradient;
    context.beginPath();
    context.roundRect(
      -objectWidth / 2,
      -objectHeight / 2,
      objectWidth,
      objectHeight,
      objectWidth * (0.18 + progress * 0.22),
    );
    context.fill();

    context.shadowColor = "transparent";
    context.strokeStyle = "rgba(255,255,255,0.55)";
    context.lineWidth = 2;
    context.beginPath();
    context.ellipse(
      -objectWidth * 0.12,
      -objectHeight * 0.07,
      objectWidth * 0.19,
      objectHeight * 0.37,
      0,
      0,
      Math.PI * 2,
    );
    context.stroke();
    context.restore();
  }, [accent, media.frameCount, progress]);

  return (
    <canvas
      ref={canvasRef}
      className="sequence-canvas"
      role="img"
      aria-label={media.alt}
    />
  );
}
