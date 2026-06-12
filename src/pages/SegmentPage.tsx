import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FoundationVisual } from "../components/FoundationVisual";
import { Footer } from "../components/Footer";
import { LineupVisual } from "../components/LineupVisual";
import { PageTransition } from "../components/PageTransition";
import { ProductRender } from "../components/ProductRender";
import { Reveal } from "../components/Reveal";
import { TactileCard } from "../components/TactileCard";
import {
  getProductsForSegment,
  getSegment,
  segments,
  slugifyProduct,
} from "../data/catalog";
import { getProductKey } from "../data/productKey";
import { formatPrice, getStoreConfiguration } from "../data/store";
import { vela } from "../data/vela";

export function SegmentPage() {
  const { segmentId } = useParams();
  const segment = getSegment(segmentId);

  useEffect(() => {
    if (segment) document.title = `${segment.name} — vela`;
  }, [segment]);

  if (!segment) return <Navigate to="/not-found" replace />;

  const products = getProductsForSegment(segment.id);
  const isAccessories = segment.id === "accessories";
  const segmentIndex = segments.findIndex((item) => item.id === segment.id);
  const nextSegment = segments[(segmentIndex + 1) % segments.length];
  const themeStyle = {
    "--brand-accent": vela.theme.accent,
    "--brand-soft": vela.theme.accentSoft,
    "--brand-ink": vela.theme.ink,
    "--brand-surface": vela.theme.surface,
    "--brand-glow": vela.theme.glow,
  } as React.CSSProperties;

  return (
    <PageTransition>
      <main id="main-content" className="segment-page" style={themeStyle}>
        <section className="segment-hero">
          <div className="segment-hero__copy">
            <p className="eyebrow">vela / {segment.eyebrow}</p>
            <h1>{segment.title}</h1>
            <p>{segment.description}</p>
            <div className="segment-hero__actions">
              <a className="embossed-button" href="#lineup">
                View the lineup
                <span aria-hidden="true">↓</span>
              </a>
              <Link
                to={`/compare?products=${products
                  .slice(0, 3)
                  .map(getProductKey)
                  .join(",")}`}
              >
                Compare models
              </Link>
            </div>
          </div>
          <div className="segment-hero__media">
            {segment.id === "platform" ? (
              <FoundationVisual />
            ) : (
              <LineupVisual
                products={products}
                label={`${segment.name} lineup`}
              />
            )}
            <span className="segment-hero__count">
              {String(products.length).padStart(2, "0")} products
            </span>
          </div>
        </section>

        <section className="segment-manifesto section-shell">
          <Reveal>
            <p className="eyebrow">one family</p>
            <p>
              {segment.description} Every model shares the same calm material
              language and a natural connection to the wider vela ecosystem.
            </p>
          </Reveal>
        </section>

        {isAccessories && (
          <nav
            className="accessory-family-nav section-shell"
            aria-label="Accessory families"
          >
            <p className="eyebrow">browse by family</p>
            <div>
              {segment.groups.map((group) => (
                <a href={`#${slugifyProduct(group.name)}`} key={group.name}>
                  <span>{group.name}</span>
                  <small>{group.models.length} products</small>
                </a>
              ))}
            </div>
          </nav>
        )}

        <section id="lineup" className="segment-lineup section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">2026 lineup</p>
            <h2>Find your place in the family.</h2>
            <p>{segment.note}</p>
          </Reveal>

          {segment.groups.map((group, groupIndex) => {
            const groupProducts = products.filter(
              (product) => product.groupName === group.name,
            );

            return (
              <section
                className="model-group"
                id={slugifyProduct(group.name)}
                key={group.name}
              >
                <Reveal className="model-group__heading">
                  <p className="eyebrow">
                    {String(groupIndex + 1).padStart(2, "0")} / {group.name}
                  </p>
                  <h3>{group.name}</h3>
                </Reveal>
                <div className="model-grid">
                  {groupProducts.map((product, productIndex) => (
                    (() => {
                      const store = getStoreConfiguration(product);
                      const priceLabel = product.availability
                        .toLowerCase()
                        .includes("organization")
                        ? "Organization pricing from"
                        : product.availability
                              .toLowerCase()
                              .includes("service")
                          ? "Service from"
                          : "From";

                      return (
                        <Reveal
                          key={product.id}
                          delay={(productIndex % 4) * 0.04}
                        >
                          <Link
                            className="model-card-link"
                            to={`/products/${segment.id}/${product.id}`}
                          >
                            <TactileCard className="model-card">
                              <div className="model-card__media">
                                {segment.id === "platform" ? (
                                  <FoundationVisual
                                    focus={product.displayName}
                                    compact
                                  />
                                ) : (
                                  <ProductRender
                                    product={product}
                                    finishColor={product.finishes[0]?.color}
                                    finishName={product.finishes[0]?.name}
                                    variant={productIndex + groupIndex}
                                  />
                                )}
                              </div>
                              <div className="model-card__copy">
                                <p className="eyebrow">{product.tier}</p>
                                <h4>{product.displayName}</h4>
                                <p>{product.tagline}</p>
                                <ul className="model-card__highlights">
                                  {product.highlights
                                    .slice(0, 2)
                                    .map((highlight) => (
                                      <li
                                        key={`${highlight.value}-${highlight.label}`}
                                      >
                                        <strong>{highlight.value}</strong>
                                        <span>{highlight.label}</span>
                                      </li>
                                    ))}
                                </ul>
                                {segment.id !== "platform" && (
                                  <p className="model-card__price">
                                    <span>
                                      {priceLabel} {formatPrice(store.basePrice)}
                                    </span>
                                    {store.listPrice && (
                                      <s>
                                        {formatPrice(store.listPrice)}
                                      </s>
                                    )}
                                  </p>
                                )}
                                <span>Discover →</span>
                              </div>
                            </TactileCard>
                          </Link>
                        </Reveal>
                      );
                    })()
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        <section className="segment-next section-shell">
          <p className="eyebrow">continue exploring</p>
          <Link to={`/products/${nextSegment.id}`}>
            <span>{nextSegment.name}</span>
            <strong>{nextSegment.title}</strong>
            <span aria-hidden="true">→</span>
          </Link>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
}
