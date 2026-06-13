import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import {
  getProductsForSegment,
  segments,
} from "../data/catalog";
import {
  hasStoreRoute,
  sitemapProductCount,
  sitemapRouteCount,
  sitemapUtilityPages,
} from "../data/sitemap";

function anchorId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function SitemapPage() {
  useEffect(() => {
    document.title = "Sitemap - vela";
  }, []);

  return (
    <PageTransition>
      <main id="main-content" className="sitemap-page">
        <section className="sitemap-hero section-shell">
          <div>
            <p className="eyebrow">vela directory</p>
            <h1>Everything vela. One map.</h1>
          </div>
          <p>
            Browse every product family, individual discovery page, software
            experience, and available store configuration across the vela
            ecosystem.
          </p>
          <dl className="sitemap-stats">
            <div>
              <dt>Lineups</dt>
              <dd>{segments.length}</dd>
            </div>
            <div>
              <dt>Products + services</dt>
              <dd>{sitemapProductCount}</dd>
            </div>
            <div>
              <dt>Mapped destinations</dt>
              <dd>{sitemapRouteCount}</dd>
            </div>
          </dl>
        </section>

        <nav className="sitemap-jump section-shell" aria-label="Sitemap sections">
          <a href="#site-pages">Site pages</a>
          {segments.map((segment) => (
            <a href={`#${anchorId(segment.id)}`} key={segment.id}>
              {segment.name}
            </a>
          ))}
        </nav>

        <section
          className="sitemap-utilities section-shell"
          id="site-pages"
          aria-labelledby="site-pages-heading"
        >
          <div className="sitemap-section-heading">
            <p className="eyebrow">Start anywhere</p>
            <h2 id="site-pages-heading">Site pages</h2>
          </div>
          <div className="sitemap-utility-grid">
            {sitemapUtilityPages.map((page) => (
              <Link to={page.path} key={page.path}>
                <span>{page.title}</span>
                <p>{page.description}</p>
                <small aria-hidden="true">Open page →</small>
              </Link>
            ))}
          </div>
        </section>

        <div className="sitemap-catalog">
          {segments.map((segment, segmentIndex) => {
            const products = getProductsForSegment(segment.id);

            return (
              <section
                className="sitemap-segment section-shell"
                id={anchorId(segment.id)}
                aria-labelledby={`${anchorId(segment.id)}-heading`}
                key={segment.id}
              >
                <header className="sitemap-segment__header">
                  <div>
                    <p className="eyebrow">
                      {String(segmentIndex + 1).padStart(2, "0")} /{" "}
                      {segment.eyebrow}
                    </p>
                    <h2 id={`${anchorId(segment.id)}-heading`}>
                      {segment.name}
                    </h2>
                  </div>
                  <div>
                    <p>{segment.description}</p>
                    <Link to={`/products/${segment.id}`}>
                      Explore the complete lineup →
                    </Link>
                  </div>
                </header>

                <div className="sitemap-groups">
                  {segment.groups.map((group) => {
                    const groupProducts = products.filter(
                      (product) => product.groupName === group.name,
                    );

                    return (
                      <article className="sitemap-group" key={group.name}>
                        <header>
                          <h3>{group.name}</h3>
                          <span>
                            {groupProducts.length}{" "}
                            {groupProducts.length === 1 ? "entry" : "entries"}
                          </span>
                        </header>
                        <ul>
                          {groupProducts.map((product) => (
                            <li key={product.id}>
                              <Link
                                className="sitemap-product-link"
                                to={`/products/${product.segmentId}/${product.id}`}
                                aria-label={product.displayName}
                              >
                                <span>{product.displayName}</span>
                                <small>
                                  {product.year ?? "Current"} · {product.tier}
                                </small>
                              </Link>
                              {hasStoreRoute(product) && (
                                <Link
                                  className="sitemap-store-link"
                                  to={`/buy/${product.segmentId}/${product.id}`}
                                  aria-label={`${product.segmentId === "atlas" ? "Pre-order" : "Configure"} ${product.displayName}`}
                                >
                                  {product.segmentId === "atlas"
                                    ? "Pre-order"
                                    : "Configure"}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <section className="sitemap-close section-shell">
          <p className="eyebrow">Still looking?</p>
          <h2>Search the whole ecosystem.</h2>
          <Link className="embossed-button" to="/search">
            Open search
            <span aria-hidden="true">⌕</span>
          </Link>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
