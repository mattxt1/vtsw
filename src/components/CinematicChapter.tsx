import { useEffect, useRef, useState } from "react";
import type { CinematicChapter as Chapter } from "../types/content";
import { AbstractMedia } from "./AbstractMedia";
import { SequenceCanvas } from "./SequenceCanvas";

interface CinematicChapterProps {
  chapter: Chapter;
  accent: string;
  index?: number;
}

export function CinematicChapter({
  chapter,
  accent,
  index = 0,
}: CinematicChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=160%",
            pin: content,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: ({ progress: value }) => setProgress(value),
          },
        });

        timeline
          .fromTo(
            content.querySelector(".chapter__copy"),
            { yPercent: 12, opacity: 0.35 },
            { yPercent: -8, opacity: 1, ease: "none" },
            0,
          )
          .fromTo(
            content.querySelector(".chapter__media"),
            { scale: 0.8, rotate: -3 },
            { scale: 1.06, rotate: 2, ease: "none" },
            0,
          );

        cleanup = () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      },
    );

    return () => cleanup();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`chapter chapter--${chapter.tone}`}
      style={{ "--chapter-accent": accent } as React.CSSProperties}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div ref={contentRef} className="chapter__pin">
        <div className="chapter__copy">
          <p className="eyebrow">{chapter.eyebrow}</p>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
          <p>{chapter.body}</p>
        </div>
        <div className="chapter__media">
          {chapter.media.kind === "sequence" ? (
            <SequenceCanvas
              progress={progress}
              accent={accent}
              media={chapter.media}
            />
          ) : chapter.media.kind === "video" && chapter.media.src ? (
            <video
              className="chapter__video"
              src={chapter.media.src}
              poster={chapter.media.poster}
              aria-label={chapter.media.alt}
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <AbstractMedia media={chapter.media} variant={index} />
          )}
        </div>
        <div className="chapter__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
