import { Link } from "react-router-dom";
import type { CatalogProduct } from "../types/content";
import { AtlasVisual } from "./AtlasVisual";
import { Reveal } from "./Reveal";
import { atlasFit } from "../data/atlasCompare";
import { formatPrice, getStoreConfiguration } from "../data/store";

function productsInGroup(
  products: CatalogProduct[],
  groupName: string,
) {
  return products.filter((product) => product.groupName === groupName);
}

export function AtlasSegmentExperience({
  products,
}: {
  products: CatalogProduct[];
}) {
  const consumer = productsInGroup(products, "consumer systems");
  const enterprise = productsInGroup(products, "enterprise systems");
  const pilotServices = productsInGroup(products, "pilot + services");
  const network = productsInGroup(products, "atlas network");
  const mobility = productsInGroup(products, "vOS 27 mobility");
  const pilotLadder = pilotServices.filter((product) =>
    [
      "atlas connect",
      "atlas assist",
      "atlas pilot",
      "atlas pilot pro",
      "atlas pilot max",
      "atlas pilot ultra",
    ].includes(product.model),
  );
  const specialistServices = pilotServices.filter(
    (product) => !pilotLadder.includes(product),
  );

  return (
    <>
      <nav className="atlas-section-nav section-shell" aria-label="Atlas sections">
        <a href="#atlas-systems">
          <span>systems</span>
          <small>6 installable hardware systems</small>
        </a>
        <a href="#atlas-services">
          <span>services</span>
          <small>pilot tiers and specialist support</small>
        </a>
        <a href="#atlas-foundation">
          <span>foundation</span>
          <small>network and vOS mobility</small>
        </a>
        <Link
          to={`/compare?mode=atlas&products=${consumer
            .slice(0, 3)
            .map((product) => `${product.segmentId}:${product.id}`)
            .join(",")}`}
        >
          <span>compare</span>
          <small>find the right atlas system</small>
        </Link>
      </nav>

      <section id="atlas-systems" className="atlas-systems section-shell">
        <Reveal className="section-heading section-heading--split">
          <p className="eyebrow">installable systems</p>
          <h2>Choose the hardware first.</h2>
          <p>
            Atlas begins with a certified sensor and compute system installed
            into a compatible vehicle. Services and software build on that
            foundation; they are not separate devices.
          </p>
        </Reveal>

        <div className="atlas-system-group">
          <Reveal className="atlas-system-group__heading">
            <p className="eyebrow">personal vehicles</p>
            <h3>Four levels of road intelligence.</h3>
          </Reveal>
          <div className="atlas-system-grid">
            {consumer.map((product, index) => {
              const store = getStoreConfiguration(product);
              const fit = atlasFit[product.model];
              return (
                <Reveal key={product.id} delay={index * 0.05}>
                  <article className="atlas-system-card">
                    <Link
                      className="atlas-system-card__visual"
                      to={`/products/atlas/${product.id}`}
                    >
                      <AtlasVisual focus={product.displayName} compact />
                    </Link>
                    <div className="atlas-system-card__copy">
                      <p>{fit?.role}</p>
                      <h4>{product.displayName}</h4>
                      <span>{product.tagline}</span>
                      <dl>
                        {product.highlights.slice(0, 3).map((highlight) => (
                          <div key={`${highlight.value}-${highlight.label}`}>
                            <dt>{highlight.label}</dt>
                            <dd>{highlight.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="atlas-system-card__actions">
                        <span>From {formatPrice(store.basePrice)} installed</span>
                        <Link to={`/products/atlas/${product.id}`}>Discover</Link>
                        <Link to={`/buy/atlas/${product.id}`}>Pre-order</Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="atlas-enterprise">
          <Reveal className="atlas-system-group__heading">
            <p className="eyebrow">organizations + agencies</p>
            <h3>Purpose-built deployments.</h3>
          </Reveal>
          <div className="atlas-enterprise-grid">
            {enterprise.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06}>
                <Link
                  className="atlas-enterprise-card"
                  to={`/products/atlas/${product.id}`}
                >
                  <div>
                    <p className="eyebrow">{atlasFit[product.model]?.role}</p>
                    <h4>{product.displayName}</h4>
                    <span>{product.tagline}</span>
                  </div>
                  <ul>
                    {product.highlights.slice(0, 3).map((highlight) => (
                      <li key={`${highlight.value}-${highlight.label}`}>
                        <strong>{highlight.value}</strong>
                        <span>{highlight.label}</span>
                      </li>
                    ))}
                  </ul>
                  <i aria-hidden="true">→</i>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="atlas-services" className="atlas-services section-shell">
        <Reveal className="section-heading section-heading--split">
          <p className="eyebrow">software + services</p>
          <h2>Capability that grows with the system.</h2>
          <p>
            Connect, assistance, and pilot plans unlock compatible hardware
            capabilities. The ladder makes the progression clear without
            presenting every plan as another physical product.
          </p>
        </Reveal>

        <div className="atlas-service-ladder">
          {pilotLadder.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <Link to={`/products/atlas/${product.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{product.displayName}</p>
                  <strong>{product.tagline}</strong>
                </div>
                <small>{product.highlights[0]?.value}</small>
                <i aria-hidden="true">→</i>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="atlas-specialist-services">
          {specialistServices.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <Link to={`/products/atlas/${product.id}`}>
                <p className="eyebrow">{product.highlights[0]?.value}</p>
                <h3>{product.displayName}</h3>
                <span>{product.tagline}</span>
                <strong>Explore service →</strong>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="atlas-foundation" className="atlas-foundation section-shell">
        <Reveal className="section-heading section-heading--split">
          <p className="eyebrow">shared foundation</p>
          <h2>One road layer. One mobility experience.</h2>
          <p>
            Network components connect the vehicle; vOS 27 mobility turns that
            connection into safety, control, route memory, and live awareness
            across vela devices.
          </p>
        </Reveal>

        <div className="atlas-foundation-grid">
          <div className="atlas-foundation-column">
            <p className="eyebrow">connection layer</p>
            {network.map((product) => (
              <Link key={product.id} to={`/products/atlas/${product.id}`}>
                <span>{product.displayName}</span>
                <small>{product.tagline}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
          <div className="atlas-foundation-column">
            <p className="eyebrow">vOS 27 mobility</p>
            {mobility.map((product) => (
              <Link key={product.id} to={`/products/atlas/${product.id}`}>
                <span>{product.displayName}</span>
                <small>{product.tagline}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </div>

        <Reveal className="atlas-compare-callout">
          <div>
            <p className="eyebrow">atlas compare</p>
            <h2>Compare systems, not feature names.</h2>
            <p>
              See hardware fit, sensing depth, maximum pilot capability,
              installation, connection, services, and support in one focused
              view.
            </p>
          </div>
          <Link
            className="embossed-button"
            to={`/compare?mode=atlas&products=${consumer
              .slice(0, 3)
              .map((product) => `${product.segmentId}:${product.id}`)
              .join(",")}`}
          >
            Compare atlas systems
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
