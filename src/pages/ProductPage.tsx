import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AtlasVisual } from "../components/AtlasVisual";
import { CinematicChapter } from "../components/CinematicChapter";
import { FoundationVisual } from "../components/FoundationVisual";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { ProductRender } from "../components/ProductRender";
import { Reveal } from "../components/Reveal";
import {
  getProduct,
  getProductsForSegment,
  getSegment,
} from "../data/catalog";
import { getProductKey } from "../data/productKey";
import { getProductPromotion } from "../data/promotions";
import { vela } from "../data/vela";
import type { CinematicChapter as Chapter } from "../types/content";

const declarationCopy: Record<string, string> = {
  mobile:
    "A personal device should disappear into the day, leaving speed, clarity, and connection within easy reach.",
  computing:
    "Serious work feels lighter when performance, input, display, and software are designed as one.",
  wearables:
    "The most personal technology earns its place by being useful without constantly asking for attention.",
  display:
    "A great screen brings the room together, then lets the picture take over.",
  audio:
    "Thoughtful sound fills the space without adding another complicated system to manage.",
  accessories:
    "The smallest details matter most when they fit precisely and work without a second thought.",
  platform:
    "The best foundation stays quiet, dependable, and ready for every experience built above it.",
  atlas:
    "Road intelligence should make complex journeys feel calmer, clearer, and more understandable.",
};

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
  const promotion = getProductPromotion(getProductKey(product));
  const isFoundationProduct = segment.id === "platform";
  const isAtlasProduct = segment.id === "atlas";
  const isAtlasHardware =
    isAtlasProduct &&
    (product.groupName === "consumer systems" ||
      product.groupName === "enterprise systems");
  const storyFeature = product.features[0];
  const supportingFeatures = product.features.slice(1);
  const chapter: Chapter = {
    id: `${product.id}-story`,
    eyebrow: storyFeature?.eyebrow ?? `${product.groupName} / ${product.platform}`,
    title: storyFeature?.title ?? `${product.displayName}, in context.`,
    body:
      storyFeature?.body ??
      `Designed around ${product.platform} for a clear, connected vela experience.`,
    media: product.media,
    tone: "brand",
  };
  const closingCopy = isFoundationProduct
    ? `See how ${product.displayName} works with the wider vela software foundation.`
    : isAtlasHardware
      ? "Build a preview configuration and review installation, service, and regional considerations before ordering opens."
      : isAtlasProduct
        ? "Explore the complete atlas platform to see how this capability connects with its hardware, services, and network."
        : "Choose your finish and available configuration in the vela store.";
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
            {isFoundationProduct ? (
              <Link
                className="product-local-nav__buy"
                to="/products/platform"
              >
                Foundation
              </Link>
            ) : isAtlasHardware ? (
              <Link
                className="product-local-nav__buy"
                to={`/buy/atlas/${product.id}`}
              >
                Pre-order
              </Link>
            ) : isAtlasProduct ? (
              <Link className="product-local-nav__buy" to="/products/atlas">
                Atlas preview
              </Link>
            ) : (
              <Link
                className="product-local-nav__buy"
                to={`/buy/${segment.id}/${product.id}`}
              >
                Buy
              </Link>
            )}
          </div>
        </nav>

        <section id="overview" className="product-hero">
          <div className="product-hero__copy">
            <p className="eyebrow">{product.eyebrow}</p>
            {promotion && (
              <p className="product-sale-kicker">
                {promotion.label} · limited-time offer available
              </p>
            )}
            <h1>{product.displayName}</h1>
            <p className="product-hero__tagline">{product.tagline}</p>
            <p>{product.description}</p>
            <div className="product-hero__actions">
              {isFoundationProduct ? (
                <a className="embossed-button" href="#details">
                  Explore the foundation
                </a>
              ) : isAtlasHardware ? (
                <Link
                  className="embossed-button"
                  to={`/buy/atlas/${product.id}`}
                >
                  Pre-order
                  <span aria-hidden="true">→</span>
                </Link>
              ) : isAtlasProduct ? (
                <a className="embossed-button" href="#details">
                  Explore the preview
                </a>
              ) : (
                <Link
                  className="embossed-button"
                  to={`/buy/${segment.id}/${product.id}`}
                >
                  Buy
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              <a href="#details">Explore the details ↓</a>
            </div>
          </div>
          <div className="product-hero__media">
            {isAtlasProduct ? (
              <AtlasVisual focus={product.displayName} />
            ) : isFoundationProduct ? (
              <FoundationVisual focus={product.displayName} />
            ) : (
              <ProductRender
                product={product}
                finishColor={product.finishes[0]?.color}
                finishName={product.finishes[0]?.name}
                priority
              />
            )}
            <div className="product-hero__stamp" aria-hidden="true">
              {product.model}
            </div>
          </div>
        </section>

        <section className="product-declaration section-shell">
          <Reveal>
            <p className="eyebrow">{product.platform}</p>
            <p>{declarationCopy[segment.id]}</p>
          </Reveal>
        </section>

        {!isAtlasProduct && (
          <CinematicChapter chapter={chapter} accent={vela.theme.accent} />
        )}

        <section id="details" className="product-details section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">at a glance</p>
            <h2>The details that define it.</h2>
            <p>
              {isFoundationProduct
                ? "The role, capabilities, and ecosystem relationships that define this part of the vela foundation."
                : isAtlasProduct
                  ? "Preview capabilities from the proposed 2027 atlas platform. Final regional availability, mapped-road support, installation compatibility, and service terms can change before release."
                : "Every headline figure is the maximum supported capability for this product family. Available configurations and exact pricing are shown in the vela store."}
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

        {supportingFeatures.length > 0 && (
          <section className="product-features section-shell">
            {supportingFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.08}>
                <p className="eyebrow">
                  {String(index + 2).padStart(2, "0")} / {feature.eyebrow}
                </p>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </Reveal>
            ))}
          </section>
        )}

        {product.finishes.length > 0 && (
          <section className="product-finishes section-shell">
            <Reveal className="section-heading section-heading--split">
              <p className="eyebrow">finishes</p>
              <h2>Made to feel personal.</h2>
              <p>
                The finish palette is shown for discovery. Availability can
                vary by size and configuration in the vela store.
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
              {isFoundationProduct
                ? "Framework, intelligence, software, silicon, and service capabilities within the current vela foundation."
                : isAtlasProduct
                  ? "Proposed 2027 atlas capabilities. Supervised autonomy always depends on driver attention, vehicle integration, mapping coverage, law, and regional approval."
                : "Product capabilities from the 2026 vela lineup. Variable specifications are presented as maximum supported figures."}
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
            <p>{closingCopy}</p>
            {isFoundationProduct ? (
              <Link className="embossed-button" to="/products/platform">
                Explore software + foundation
              </Link>
            ) : isAtlasHardware ? (
              <Link
                className="embossed-button"
                to={`/buy/atlas/${product.id}`}
              >
                Configure pre-order
                <span aria-hidden="true">→</span>
              </Link>
            ) : isAtlasProduct ? (
              <Link className="embossed-button" to="/products/atlas">
                Explore the atlas lineup
              </Link>
            ) : (
              <Link
                className="embossed-button"
                to={`/buy/${segment.id}/${product.id}`}
              >
                Buy
                <span aria-hidden="true">→</span>
              </Link>
            )}
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
