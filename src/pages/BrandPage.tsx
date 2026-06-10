import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AbstractMedia } from "../components/AbstractMedia";
import { BrandMark } from "../components/BrandMark";
import { CinematicChapter } from "../components/CinematicChapter";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import { SceneStage } from "../components/SceneStage";
import { TactileCard } from "../components/TactileCard";
import { brands, getBrand } from "../data/brands";

export function BrandPage() {
  const { slug } = useParams();
  const brand = getBrand(slug);

  useEffect(() => {
    if (brand) document.title = `${brand.name} — Fieldwork`;
  }, [brand]);

  if (!brand) return <Navigate to="/not-found" replace />;

  const index = brands.findIndex((item) => item.slug === brand.slug);
  const previous = brands[(index - 1 + brands.length) % brands.length];
  const next = brands[(index + 1) % brands.length];

  const themeStyle = {
    "--brand-accent": brand.theme.accent,
    "--brand-soft": brand.theme.accentSoft,
    "--brand-ink": brand.theme.ink,
    "--brand-surface": brand.theme.surface,
    "--brand-glow": brand.theme.glow,
  } as React.CSSProperties;

  return (
    <PageTransition>
      <main id="main-content" className="brand-page" style={themeStyle}>
        <section className="brand-hero">
          <div className="brand-hero__copy">
            <p className="eyebrow">{brand.category}</p>
            <BrandMark brand={brand} size="small" />
            <h1>{brand.statement}</h1>
            <p>{brand.description}</p>
            <a
              className="embossed-button"
              href={brand.externalUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit {brand.name}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="brand-hero__media">
            {brand.hero.kind === "sequence" ? (
              <SceneStage accent={brand.theme.accent} label={brand.hero.alt} />
            ) : (
              <AbstractMedia media={brand.hero} variant={index} />
            )}
          </div>
          <p className="brand-hero__number" aria-hidden="true">
            0{index + 1}
          </p>
        </section>

        {brand.chapters.map((chapter, chapterIndex) => (
          <CinematicChapter
            key={chapter.id}
            chapter={chapter}
            accent={brand.theme.accent}
            index={chapterIndex + index}
          />
        ))}

        <section className="brand-highlights section-shell">
          <Reveal className="section-heading">
            <p className="eyebrow">Selected details</p>
            <h2>A closer look at {brand.name}.</h2>
          </Reveal>
          <div className="highlight-grid">
            {brand.highlights.map((highlight, highlightIndex) => (
              <Reveal key={highlight.title} delay={highlightIndex * 0.08}>
                <TactileCard className="highlight-card">
                  {highlight.media.kind === "scene" ? (
                    <SceneStage
                      accent={brand.theme.accent}
                      label={highlight.media.alt}
                    />
                  ) : (
                    <AbstractMedia
                      media={highlight.media}
                      variant={highlightIndex + index}
                    />
                  )}
                  <p className="eyebrow">{highlight.eyebrow}</p>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </TactileCard>
              </Reveal>
            ))}
          </div>
        </section>

        <nav className="adjacent-brands section-shell" aria-label="More brands">
          <Link to={`/brands/${previous.slug}`}>
            <span>Previous</span>
            <strong>← {previous.name}</strong>
          </Link>
          <Link to={`/brands/${next.slug}`}>
            <span>Next</span>
            <strong>{next.name} →</strong>
          </Link>
        </nav>
        <Footer />
      </main>
    </PageTransition>
  );
}
