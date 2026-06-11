import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AbstractMedia } from "../components/AbstractMedia";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import {
  buildComparisonSections,
  getComparisonSummary,
  getProductKey,
  MAX_COMPARE_PRODUCTS,
  parseComparisonProducts,
} from "../data/compare";
import { catalogProducts, segments } from "../data/catalog";
import { vela } from "../data/vela";

const defaultProducts = ["mobile:x26-ultra", "mobile:x26-pro", "mobile:x26"];

export function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasProductParameter = searchParams.has("products");
  const selectedProducts = useMemo(
    () =>
      parseComparisonProducts(
        hasProductParameter
          ? searchParams.get("products")
          : defaultProducts.join(","),
      ),
    [hasProductParameter, searchParams],
  );
  const [differencesOnly, setDifferencesOnly] = useState(false);

  useEffect(() => {
    document.title = "Compare vela devices";
  }, []);

  const sections = buildComparisonSections(
    selectedProducts,
    differencesOnly && selectedProducts.length > 1,
  );
  const selectedKeys = selectedProducts.map(getProductKey);
  const slots = Array.from(
    { length: Math.min(selectedProducts.length + 1, MAX_COMPARE_PRODUCTS) },
    (_, index) => selectedProducts[index],
  );
  const themeStyle = {
    "--brand-accent": vela.theme.accent,
    "--brand-soft": vela.theme.accentSoft,
    "--brand-ink": vela.theme.ink,
    "--brand-surface": vela.theme.surface,
    "--brand-glow": vela.theme.glow,
  } as React.CSSProperties;

  function updateProducts(keys: string[]) {
    const next = new URLSearchParams(searchParams);
    next.set("products", keys.slice(0, MAX_COMPARE_PRODUCTS).join(","));
    setSearchParams(next, { replace: true });
  }

  function selectProduct(slotIndex: number, key: string) {
    const next = [...selectedKeys];

    if (!key) {
      next.splice(slotIndex, 1);
    } else if (slotIndex < next.length) {
      next[slotIndex] = key;
    } else {
      next.push(key);
    }

    updateProducts([...new Set(next)]);
  }

  return (
    <PageTransition>
      <main id="main-content" className="compare-page" style={themeStyle}>
        <section className="compare-hero section-shell">
          <Reveal>
            <p className="eyebrow">vela compare</p>
            <h1>See what fits.</h1>
            <p>
              Compare up to three devices across design, performance, software,
              and category-specific capabilities. Exact prices and available
              configurations are shown on each device's buy page.
            </p>
          </Reveal>
        </section>

        <section className="compare-builder section-shell">
          <div className="compare-selection-grid">
            {slots.map((product, slotIndex) => (
              <Reveal
                className={`compare-selection-card${
                  product ? " is-selected" : " is-empty"
                }`}
                key={product ? getProductKey(product) : `empty-${slotIndex}`}
                delay={slotIndex * 0.05}
              >
                <label htmlFor={`compare-product-${slotIndex}`}>
                  {product ? `Device ${slotIndex + 1}` : "Add a device"}
                </label>
                <select
                  id={`compare-product-${slotIndex}`}
                  value={product ? getProductKey(product) : ""}
                  onChange={(event) =>
                    selectProduct(slotIndex, event.target.value)
                  }
                >
                  <option value="">
                    {product ? "Remove this device" : "Choose a vela device"}
                  </option>
                  {segments.map((segment) => (
                    <optgroup key={segment.id} label={segment.name}>
                      {catalogProducts
                        .filter((item) => item.segmentId === segment.id)
                        .map((item) => {
                          const key = getProductKey(item);
                          return (
                            <option
                              key={key}
                              value={key}
                              disabled={
                                selectedKeys.includes(key) &&
                                key !== (product ? getProductKey(product) : "")
                              }
                            >
                              {item.displayName}
                            </option>
                          );
                        })}
                    </optgroup>
                  ))}
                </select>

                {product ? (
                  <>
                    <div className="compare-selection-card__media">
                      <AbstractMedia media={product.media} variant={slotIndex} />
                    </div>
                    <div className="compare-selection-card__copy">
                      <p className="eyebrow">{product.groupName}</p>
                      <h2>{product.displayName}</h2>
                      <p>{product.tagline}</p>
                      <ul>
                        {product.highlights.slice(0, 4).map((highlight) => (
                          <li key={`${highlight.value}-${highlight.label}`}>
                            <strong>{highlight.value}</strong>
                            <span>{highlight.label}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/products/${product.segmentId}/${product.id}`}
                      >
                        Discover {product.model}
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="compare-selection-card__empty">
                    <span aria-hidden="true">+</span>
                    <p>
                      Choose any current vela device. Related products usually
                      provide the clearest comparison.
                    </p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {selectedProducts.length > 0 && (
          <section className="compare-results section-shell">
            <Reveal className="compare-insight">
              <div>
                <p className="eyebrow">comparison view</p>
                <h2>
                  {selectedProducts.length === 1
                    ? "Add another perspective."
                    : "Shared foundations. Clear differences."}
                </h2>
                <p>{getComparisonSummary(selectedProducts)}</p>
              </div>
              <label className="compare-differences-toggle">
                <input
                  type="checkbox"
                  checked={differencesOnly}
                  disabled={selectedProducts.length < 2}
                  onChange={(event) =>
                    setDifferencesOnly(event.target.checked)
                  }
                />
                <span aria-hidden="true" />
                Show differences only
              </label>
            </Reveal>

            <div
              className="compare-table-scroll"
              role="region"
              aria-label="Device specification comparison"
              tabIndex={0}
            >
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">Specification</th>
                    {selectedProducts.map((product) => (
                      <th scope="col" key={getProductKey(product)}>
                        <span>{product.groupName}</span>
                        <strong>{product.displayName}</strong>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section) => (
                    <Fragment key={section.title}>
                      <tr
                        className="compare-table__section"
                      >
                        <th
                          colSpan={selectedProducts.length + 1}
                          scope="colgroup"
                        >
                          {section.title}
                        </th>
                      </tr>
                      {section.rows.map((row) => (
                        <tr
                          className={`compare-table__row compare-table__row--${row.status}`}
                          key={`${section.title}-${row.label}`}
                        >
                          <th scope="row">
                            {row.label}
                            <span>{row.status}</span>
                          </th>
                          {row.values.map((value, index) => (
                            <td
                              key={`${section.title}-${row.label}-${selectedKeys[index]}`}
                            >
                              {value ?? (
                                <span className="compare-table__not-applicable">
                                  Not applicable
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <Reveal className="compare-legend">
              <span>
                <i className="is-shared" /> Shared
              </span>
              <span>
                <i className="is-different" /> Different
              </span>
              <span>
                <i className="is-specific" /> Category-specific
              </span>
            </Reveal>
          </section>
        )}

        <Footer />
      </main>
    </PageTransition>
  );
}
