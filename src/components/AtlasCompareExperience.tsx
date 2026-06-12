import { Link } from "react-router-dom";
import type { CatalogProduct } from "../types/content";
import {
  atlasComparisonSections,
  atlasFit,
  getAtlasComparisonValue,
  isAtlasHardware,
} from "../data/atlasCompare";
import { comparisonProducts, getProductKey } from "../data/compare";
import { formatPrice, getStoreConfiguration } from "../data/store";
import { AtlasVisual } from "./AtlasVisual";
import { Footer } from "./Footer";
import { Reveal } from "./Reveal";

const atlasProducts = comparisonProducts.filter(isAtlasHardware);

function rowIsDifferent(
  products: CatalogProduct[],
  values: string[],
) {
  if (products.length < 2) return true;
  return new Set(values.map((value) => value.toLowerCase())).size > 1;
}

export function AtlasCompareExperience({
  selectedProducts,
  slots,
  selectedKeys,
  differencesOnly,
  onDifferencesChange,
  onSelectProduct,
}: {
  selectedProducts: CatalogProduct[];
  slots: Array<CatalogProduct | undefined>;
  selectedKeys: string[];
  differencesOnly: boolean;
  onDifferencesChange: (checked: boolean) => void;
  onSelectProduct: (slotIndex: number, key: string) => void;
}) {
  const personalProducts = atlasProducts.filter(
    (product) => product.groupName === "consumer systems",
  );
  const enterpriseProducts = atlasProducts.filter(
    (product) => product.groupName === "enterprise systems",
  );

  return (
    <>
      <section className="atlas-compare-hero section-shell">
        <Reveal>
          <p className="eyebrow">vela atlas / system compare</p>
          <h1>Find your level of road intelligence.</h1>
          <p>
            Compare installable atlas systems by vehicle fit, sensing depth,
            maximum supported pilot capability, installation, services, and
            long-term support.
          </p>
          <Link to="/products/atlas">Explore the complete atlas platform →</Link>
        </Reveal>
        <div className="atlas-compare-hero__visual">
          <AtlasVisual focus="atlas system comparison" />
        </div>
      </section>

      <section className="atlas-compare-builder section-shell">
        <Reveal className="atlas-compare-builder__heading">
          <div>
            <p className="eyebrow">choose up to three systems</p>
            <h2>Hardware first.</h2>
          </div>
          <p>
            Plans and software are shown as compatible layers inside the
            comparison, rather than as additional products.
          </p>
        </Reveal>

        <div className="atlas-compare-selection-grid">
          {slots.map((product, slotIndex) => (
            <article
              className={`atlas-compare-card${
                product ? " is-selected" : " is-empty"
              }`}
              key={product ? getProductKey(product) : `atlas-empty-${slotIndex}`}
            >
              <label htmlFor={`atlas-compare-product-${slotIndex}`}>
                {product ? `System ${slotIndex + 1}` : "Add a system"}
              </label>
              <select
                id={`atlas-compare-product-${slotIndex}`}
                value={product ? getProductKey(product) : ""}
                onChange={(event) =>
                  onSelectProduct(slotIndex, event.target.value)
                }
              >
                <option value="">
                  {product ? "Remove this system" : "Choose an atlas system"}
                </option>
                <optgroup label="Personal vehicles">
                  {personalProducts.map((candidate) => {
                    const key = getProductKey(candidate);
                    return (
                      <option
                        key={key}
                        value={key}
                        disabled={
                          selectedKeys.includes(key) &&
                          key !== (product ? getProductKey(product) : "")
                        }
                      >
                        {candidate.displayName}
                      </option>
                    );
                  })}
                </optgroup>
                <optgroup label="Organizations + agencies">
                  {enterpriseProducts.map((candidate) => {
                    const key = getProductKey(candidate);
                    return (
                      <option
                        key={key}
                        value={key}
                        disabled={
                          selectedKeys.includes(key) &&
                          key !== (product ? getProductKey(product) : "")
                        }
                      >
                        {candidate.displayName}
                      </option>
                    );
                  })}
                </optgroup>
              </select>

              {product ? (
                <>
                  <div className="atlas-compare-card__visual">
                    <AtlasVisual focus={product.displayName} compact />
                  </div>
                  <div className="atlas-compare-card__copy">
                    <p>{atlasFit[product.model]?.role}</p>
                    <h2>{product.displayName}</h2>
                    <span>{atlasFit[product.model]?.idealFor}</span>
                    <div className="atlas-compare-card__metrics">
                      {product.highlights.slice(0, 3).map((highlight) => (
                        <div key={`${highlight.value}-${highlight.label}`}>
                          <strong>{highlight.value}</strong>
                          <small>{highlight.label}</small>
                        </div>
                      ))}
                    </div>
                    <div className="atlas-compare-card__price">
                      <span>
                        From{" "}
                        {formatPrice(getStoreConfiguration(product).basePrice)}
                        <small> installed</small>
                      </span>
                      <Link to={`/products/atlas/${product.id}`}>Discover →</Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="atlas-compare-card__empty">
                  <span aria-hidden="true">+</span>
                  <p>
                    Add another installable atlas system to compare capability
                    and fit.
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {selectedProducts.length > 0 && (
        <section className="atlas-compare-results section-shell">
          <Reveal className="atlas-compare-results__heading">
            <div>
              <p className="eyebrow">system architecture</p>
              <h2>See what changes as atlas goes deeper.</h2>
              <p>
                Core safety remains foundational. Higher systems add sensor
                redundancy, compute headroom, broader pilot capability, and
                more resilient connections.
              </p>
            </div>
            <label className="compare-differences-toggle">
              <input
                type="checkbox"
                checked={differencesOnly}
                disabled={selectedProducts.length < 2}
                onChange={(event) =>
                  onDifferencesChange(event.target.checked)
                }
              />
              <span aria-hidden="true" />
              Show differences only
            </label>
          </Reveal>

          <div className="atlas-comparison-sections">
            {atlasComparisonSections.map((section) => {
              const rows = section.rows.filter((row) => {
                const values = selectedProducts.map((product) =>
                  getAtlasComparisonValue(product, row),
                );
                return !differencesOnly || rowIsDifferent(selectedProducts, values);
              });

              if (rows.length === 0) return null;

              return (
                <section className="atlas-comparison-section" key={section.title}>
                  <div className="atlas-comparison-section__intro">
                    <p className="eyebrow">{section.title}</p>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                  <div
                    className="atlas-comparison-table-scroll"
                    role="region"
                    aria-label={`${section.title} atlas comparison`}
                    tabIndex={0}
                  >
                    <table className="atlas-comparison-table">
                      <thead>
                        <tr>
                          <th scope="col">Capability</th>
                          {selectedProducts.map((product) => (
                            <th scope="col" key={getProductKey(product)}>
                              {product.displayName}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            {selectedProducts.map((product) => (
                              <td key={`${row.label}-${product.id}`}>
                                {getAtlasComparisonValue(product, row)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}
          </div>

          <Reveal className="atlas-safety-note">
            <span aria-hidden="true">◉</span>
            <div>
              <p className="eyebrow">shared safety principle</p>
              <h3>The driver remains responsible.</h3>
              <p>
                Atlas capabilities depend on compatible installation,
                continuous driver attention where required, mapped-road
                coverage, weather, law, and regional approval. Guardian safety
                functions remain active independently of paid pilot plans where
                legally required.
              </p>
            </div>
          </Reveal>
        </section>
      )}

      <Footer />
    </>
  );
}
