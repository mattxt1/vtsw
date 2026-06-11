import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AbstractMedia } from "../components/AbstractMedia";
import { CinematicChapter } from "../components/CinematicChapter";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import {
  getProduct,
  getProductsForSegment,
  getSegment,
} from "../data/catalog";
import { vela } from "../data/vela";
import type { CinematicChapter as Chapter } from "../types/content";

export function ProductPage() {
  const { segmentId, productId } = useParams();
  const product = getProduct(segmentId, productId);
  const segment = getSegment(segmentId);

  useEffect(() => {
    if (product) document.title = `${product.displayName} — vela`;
  }, [product]);

  if (!product || !segment) return <Navigate to="/not-found" replace />;

  const siblings = getProductsForSegment(segment.id);
  const productIndex = siblings.findIndex((item) => item.id === product.id);
  const previous = siblings[(productIndex - 1 + siblings.length) % siblings.length];
  const next = siblings[(productIndex + 1) % siblings.length];
  const chapter: Chapter = {
    id: `${product.id}-story`,
    eyebrow: `${product.groupName} / ${product.platform}`,
    title: product.tagline,
    body: product.description,
    media: product.media,
    tone: "brand",
  };
  const themeStyle = {
    "--brand-accent": vela.theme.accent,
    "--brand-soft": vela.theme.accentSoft,
    "--brand-ink": vela.theme.ink,
    "--brand-surface": vela.theme.surface,
    "--brand-glow": vela.theme.glow,
  } as React.CSSProperties;

  return (
    <PageTransition>
      <main id="main-content" className="product-page" style={themeStyle}>
        <nav className="product-local-nav" aria-label="Product navigation">
          <Link to={`/products/${segment.id}`}>{segment.name}</Link>
          <strong>{product.displayName}</strong>
          <div>
            <a href="#overview">Overview</a>
            <a href="#specifications">Specs</a>
            <Link
              to={`/compare?products=${product.segmentId}:${product.id}`}
            >
              Compare
            </Link>
            <Link
              className="product-local-nav__buy"
              to={`/buy/${segment.id}/${product.id}`}
            >
              Buy
            </Link>
          </div>
        </nav>

        <section id="overview" className="product-hero">
          <div className="product-hero__copy">
            <p className="eyebrow">{product.eyebrow}</p>
            <h1>{product.displayName}</h1>
            <p className="product-hero__tagline">{product.tagline}</p>
            <p>{product.description}</p>
            <div className="product-hero__actions">
              <Link
                className="embossed-button"
                to={`/buy/${segment.id}/${product.id}`}
              >
                Buy
                <span aria-hidden="true">→</span>
              </Link>
              <a href="#details">Explore the details ↓</a>
            </div>
          </div>
          <div className="product-hero__media">
            <AbstractMedia media={product.media} variant={productIndex} />
            <div className="product-hero__stamp" aria-hidden="true">
              {product.model}
            </div>
          </div>
        </section>

        <section className="product-declaration section-shell">
          <Reveal>
            <p className="eyebrow">{product.platform}</p>
            <p>{product.tagline}</p>
          </Reveal>
        </section>

        <CinematicChapter chapter={chapter} accent={vela.theme.accent} />

        <section id="details" className="product-details section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">at a glance</p>
            <h2>The details that define it.</h2>
            <p>
              Every headline figure is the maximum supported capability for
              this product family. Purchase configurations will live in the
              future vela store.
            </p>
          </Reveal>
          <div className="product-facts">
            {product.highlights.slice(0, 4).map((highlight, index) => (
              <Reveal
                key={`${highlight.value}-${highlight.label}`}
                delay={index * 0.05}
              >
                <p>{highlight.label}</p>
                <strong>{highlight.value}</strong>
              </Reveal>
            ))}
          </div>
          <Reveal className="product-metadata">
            <span>{product.platform}</span>
            <span>{product.support}</span>
            <span>{product.availability}</span>
            <span>{product.year ?? "Current generation"}</span>
          </Reveal>
        </section>

        <section className="product-features section-shell">
          {product.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} / {feature.eyebrow}
              </p>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </Reveal>
          ))}
        </section>

        {product.finishes.length > 0 && (
          <section className="product-finishes section-shell">
            <Reveal className="section-heading section-heading--split">
              <p className="eyebrow">finishes</p>
              <h2>Made to feel personal.</h2>
              <p>
                The finish palette is shown for discovery. Availability may
                vary when the vela store opens.
              </p>
            </Reveal>
            <div className="product-finish-grid">
              {product.finishes.map((finish, index) => (
                <Reveal key={finish.name} delay={index * 0.04}>
                  <span
                    className="product-finish-swatch"
                    style={
                      {
                        "--finish-color": finish.color,
                      } as React.CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <strong>{finish.name}</strong>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <section
          id="specifications"
          className="product-specifications section-shell"
        >
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">technical details</p>
            <h2>A closer look.</h2>
            <p>
              Product capabilities from the 2026 vela lineup. Variable
              specifications are presented as maximum supported figures.
            </p>
          </Reveal>
          <div className="product-spec-grid">
            {product.specifications.map((group, groupIndex) => (
              <Reveal
                className="product-spec-group"
                key={group.title}
                delay={(groupIndex % 3) * 0.05}
              >
                <h3>{group.title}</h3>
                <dl>
                  {group.items.map((item) => (
                    <div key={`${item.label}-${item.value}`}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="product-buy-panel section-shell">
          <Reveal>
            <p className="eyebrow">{product.availability}</p>
            <h2>{product.displayName}</h2>
            <p>{product.tagline}</p>
            <Link
              className="embossed-button"
              to={`/buy/${segment.id}/${product.id}`}
            >
              Buy
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </section>

        <nav className="product-adjacent" aria-label="More products">
          <Link to={`/products/${segment.id}/${previous.id}`}>
            <span>Previous</span>
            <strong>← {previous.displayName}</strong>
          </Link>
          <Link to={`/products/${segment.id}/${next.id}`}>
            <span>Next</span>
            <strong>{next.displayName} →</strong>
          </Link>
        </nav>
        <Footer />
      </main>
    </PageTransition>
  );
}
