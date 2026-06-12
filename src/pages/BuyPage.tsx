import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AtlasVisual } from "../components/AtlasVisual";
import { PageTransition } from "../components/PageTransition";
import { ProductRender } from "../components/ProductRender";
import { useCart } from "../context/CartContext";
import { getProduct } from "../data/catalog";
import {
  formatPrice,
  getStoreConfiguration,
  getStoreProductsForFamily,
} from "../data/store";
import type { CartSelection, StoreOptionGroup } from "../types/store";

type SelectionState = Record<string, string[]>;

function initialSelections(groups: StoreOptionGroup[], protectId: string) {
  const selections = groups.reduce<SelectionState>(
    (selections, group) => ({
      ...selections,
      [group.id]: group.mode === "single" ? [group.options[0]?.id] : [],
    }),
    {},
  );

  return protectId ? { ...selections, protect: [protectId] } : selections;
}

export function BuyPage() {
  const { segmentId, productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = useMemo(
    () => getProduct(segmentId, productId),
    [productId, segmentId],
  );
  const configuration = useMemo(
    () => (product ? getStoreConfiguration(product) : undefined),
    [product],
  );
  const [selections, setSelections] = useState<SelectionState>(() =>
    configuration
      ? initialSelections(
          configuration.optionGroups,
          configuration.protectOptions[0]?.id ?? "",
        )
      : {},
  );
  const [preorderNotice, setPreorderNotice] = useState(false);

  useEffect(() => {
    if (product) {
      document.title =
        product.segmentId === "atlas"
          ? `Pre-order ${product.displayName} - vela`
          : `Buy ${product.displayName} - vela`;
    }
  }, [product]);

  const selectedOptions = useMemo(() => {
    if (!configuration) return [];

    const groups = [
      ...configuration.optionGroups,
      ...(configuration.protectOptions.length > 0
        ? [
            {
              id: "protect",
              label: "vela protect",
              mode: "single" as const,
              options: configuration.protectOptions,
            },
          ]
        : []),
    ];

    return groups.flatMap((group) =>
      group.options
        .filter((option) => selections[group.id]?.includes(option.id))
        .map<CartSelection>((option) => ({
          groupId: group.id,
          groupLabel: group.label.replace(/\.$/, ""),
          optionId: option.id,
          optionLabel: option.label,
          priceDelta: option.priceDelta,
          recurringPrice: option.recurringPrice,
          color: option.color,
        })),
    );
  }, [configuration, selections]);

  if (!product || !configuration) {
    return <Navigate to="/not-found" replace />;
  }

  const isAtlasPreorder =
    product.segmentId === "atlas" &&
    (product.groupName === "consumer systems" ||
      product.groupName === "enterprise systems");

  if (product.segmentId === "atlas" && !isAtlasPreorder) {
    return <Navigate to={`/products/atlas/${product.id}`} replace />;
  }

  const family = getStoreProductsForFamily(product);
  const subtotal =
    configuration.basePrice +
    selectedOptions.reduce((total, option) => total + option.priceDelta, 0);
  const listSubtotal = configuration.listPrice
    ? configuration.listPrice +
      selectedOptions.reduce((total, option) => total + option.priceDelta, 0)
    : undefined;
  const recurringTotal = selectedOptions.reduce(
    (total, option) => total + (option.recurringPrice ?? 0),
    0,
  );
  const selectedFinish = selectedOptions.find(
    (selection) => selection.groupId === "finish",
  );
  const currentProduct = product;
  const currentConfiguration = configuration;

  function chooseSingle(groupId: string, optionId: string) {
    setSelections((current) => ({ ...current, [groupId]: [optionId] }));
  }

  function toggleMultiple(groupId: string, optionId: string) {
    setSelections((current) => {
      const selected = current[groupId] ?? [];
      return {
        ...current,
        [groupId]: selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId],
      };
    });
  }

  function addConfiguredProduct() {
    addItem({
      productKey: currentConfiguration.productKey,
      productName: currentProduct.displayName,
      productRoute: `/buy/${currentProduct.segmentId}/${currentProduct.id}`,
      selections: selectedOptions,
      unitPrice: subtotal,
    });
    navigate("/cart");
  }

  return (
    <PageTransition>
      <main id="main-content" className="buy-page">
        <header className="store-local-nav">
          <Link to={`/products/${product.segmentId}/${product.id}`}>
            {product.displayName}
          </Link>
          <span>{isAtlasPreorder ? "Pre-order" : "Configure"}</span>
          <Link to={isAtlasPreorder ? "/products/atlas" : "/cart"}>
            {isAtlasPreorder ? "Atlas" : "Bag"}
          </Link>
        </header>

        <div className="buy-layout section-shell">
          <aside className="buy-visual" aria-label="Your configuration">
            <div className="buy-visual__sticky">
              <p className="eyebrow">your {product.model}</p>
              <div className="buy-visual__price" aria-live="polite">
                <div>
                  <p>
                    {isAtlasPreorder
                      ? "estimated installed price"
                      : configuration.promotionLabel
                      ? `${configuration.promotionLabel} subtotal`
                      : "configured subtotal"}
                  </p>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                {listSubtotal && (
                  <span>
                    <s>{formatPrice(listSubtotal)}</s>
                    Save {formatPrice(listSubtotal - subtotal)}
                  </span>
                )}
                {isAtlasPreorder && recurringTotal > 0 && (
                  <span>{formatPrice(recurringTotal)}/month in services</span>
                )}
              </div>
              {isAtlasPreorder ? (
                <AtlasVisual
                  focus={product.displayName}
                  finishColor={selectedFinish?.color}
                />
              ) : (
                <ProductRender
                  product={product}
                  finishColor={selectedFinish?.color}
                  finishName={selectedFinish?.optionLabel}
                  priority
                />
              )}
              <div className="buy-visual__caption">
                <strong>{selectedFinish?.optionLabel ?? product.tagline}</strong>
                <span>
                  {isAtlasPreorder
                    ? "Installation and compatibility are confirmed before ordering."
                    : `Designed around ${product.platform}`}
                </span>
              </div>
            </div>
          </aside>

          <div className="buy-configurator">
            <div className="buy-intro">
              <p className="eyebrow">
                {isAtlasPreorder
                  ? `2027 preview / pre-order ${product.displayName}`
                  : configuration.promotionLabel
                  ? `${configuration.promotionLabel} / buy ${product.displayName}`
                  : `buy ${product.displayName}`}
              </p>
              <h1>{isAtlasPreorder ? "Build your atlas." : "Make it yours."}</h1>
              {isAtlasPreorder ? (
                <p>
                  From {formatPrice(configuration.basePrice)} installed.
                  Configure a preview now; no reservation or payment will be
                  taken.
                </p>
              ) : configuration.listPrice ? (
                <p className="buy-intro__sale">
                  Now from <strong>{formatPrice(configuration.basePrice)}</strong>
                  <s>{formatPrice(configuration.listPrice)}</s>
                  <span>
                    Choose each detail and see your subtotal update as you go.
                  </span>
                </p>
              ) : (
                <p>
                  From {formatPrice(configuration.basePrice)}. Choose each detail
                  and see your subtotal update as you go.
                </p>
              )}
            </div>

            {family.length > 1 && (
              <section className="store-step" aria-labelledby="model-heading">
                <div className="store-step__heading">
                  <span>01</span>
                  <div>
                    <h2 id="model-heading">Choose your model.</h2>
                    <p>Compare the role and starting point of each model.</p>
                  </div>
                </div>
                <div className="store-model-grid">
                  {family.map((candidate) => {
                    const candidateStore = getStoreConfiguration(candidate);
                    return (
                      <Link
                        key={candidate.id}
                        className={
                          candidate.id === product.id
                            ? "store-model-card is-selected"
                            : "store-model-card"
                        }
                        to={`/buy/${candidate.segmentId}/${candidate.id}`}
                        aria-current={
                          candidate.id === product.id ? "true" : undefined
                        }
                      >
                        <strong>{candidate.displayName}</strong>
                        <span>{candidate.tagline}</span>
                        <small>
                          {candidateStore.listPrice && (
                            <s>From {formatPrice(candidateStore.listPrice)}</s>
                          )}
                          From {formatPrice(candidateStore.basePrice)}
                        </small>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {configuration.optionGroups.map((group, groupIndex) => (
              <section
                className="store-step"
                key={group.id}
                aria-labelledby={`${group.id}-heading`}
              >
                <div className="store-step__heading">
                  <span>
                    {String(groupIndex + (family.length > 1 ? 2 : 1)).padStart(
                      2,
                      "0",
                    )}
                  </span>
                  <div>
                    <h2 id={`${group.id}-heading`}>{group.label}</h2>
                    {group.description && <p>{group.description}</p>}
                  </div>
                </div>
                <div
                  className={`store-options ${
                    group.id === "finish" ? "store-options--finish" : ""
                  }`}
                >
                  {group.options.map((option) => {
                    const checked = selections[group.id]?.includes(option.id);
                    return (
                      <label
                        className={checked ? "store-option is-selected" : "store-option"}
                        key={option.id}
                      >
                        <input
                          type={group.mode === "single" ? "radio" : "checkbox"}
                          name={group.id}
                          checked={checked}
                          onChange={() =>
                            group.mode === "single"
                              ? chooseSingle(group.id, option.id)
                              : toggleMultiple(group.id, option.id)
                          }
                        />
                        {option.color && (
                          <i
                            className="store-option__swatch"
                            style={{ "--option-color": option.color } as React.CSSProperties}
                            aria-hidden="true"
                          />
                        )}
                        <span>
                          <strong>{option.label}</strong>
                          {option.detail && <small>{option.detail}</small>}
                        </span>
                        <b>
                          {option.priceLabel ??
                            (option.recurringPrice
                              ? `${formatPrice(option.recurringPrice)}/mo`
                              : option.priceDelta === 0
                                ? "Included"
                                : `+${formatPrice(option.priceDelta)}`)}
                        </b>
                      </label>
                    );
                  })}
                </div>
              </section>
            ))}

            {configuration.protectOptions.length > 0 && (
              <section className="store-step" aria-labelledby="protect-heading">
                <div className="store-step__heading">
                  <span>
                    {String(
                      configuration.optionGroups.length +
                        (family.length > 1 ? 2 : 1),
                    ).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 id="protect-heading">Add vela protect.</h2>
                    <p>
                      Reduced-cost accidental damage service, priority support,
                      and express replacement on eligible devices.
                    </p>
                  </div>
                </div>
                <div className="store-options">
                  {configuration.protectOptions.map((option) => {
                    const checked = selections.protect?.includes(option.id);
                    return (
                      <label
                        className={
                          checked
                            ? "store-option is-selected"
                            : "store-option"
                        }
                        key={option.id}
                      >
                        <input
                          type="radio"
                          name="protect"
                          checked={checked}
                          onChange={() => chooseSingle("protect", option.id)}
                        />
                        <span>
                          <strong>{option.label}</strong>
                          {option.detail && <small>{option.detail}</small>}
                        </span>
                        <b>
                          {option.priceDelta === 0
                            ? "Included"
                            : `+${formatPrice(option.priceDelta)}`}
                        </b>
                      </label>
                    );
                  })}
                </div>
                {!configuration.protectOptions.some(
                  (option) => option.id === "included",
                ) && (
                  <p className="store-disclosure">
                    vela protect service pricing is preliminary pending the
                    final service schedule.
                  </p>
                )}
              </section>
            )}

            <section className="buy-summary" aria-label="Configuration subtotal">
              <div>
                <p className="eyebrow">
                  {isAtlasPreorder
                    ? "estimated installed price"
                    : configuration.promotionLabel
                    ? `${configuration.promotionLabel} subtotal`
                    : "configured subtotal"}
                </p>
                <h2>{formatPrice(subtotal)}</h2>
                {isAtlasPreorder && recurringTotal > 0 && (
                  <p className="buy-summary__recurring">
                    Plus {formatPrice(recurringTotal)}/month for selected
                    services
                  </p>
                )}
                {listSubtotal && (
                  <p className="buy-summary__saving">
                    <s>{formatPrice(listSubtotal)}</s>
                    You save{" "}
                    {formatPrice(listSubtotal - subtotal)}
                  </p>
                )}
                <p>
                  {isAtlasPreorder
                    ? "Final compatibility, regional availability, financing, taxes, and service terms will be confirmed before ordering."
                    : "Taxes are calculated at checkout. Delivery is included."}
                </p>
              </div>
              {isAtlasPreorder ? (
                <div className="atlas-preorder-action">
                  <button
                    className="embossed-button store-primary-button"
                    type="button"
                    onClick={() => setPreorderNotice(true)}
                  >
                    Pre-order
                    <span aria-hidden="true">→</span>
                  </button>
                  {preorderNotice && (
                    <div
                      className="atlas-preorder-notice"
                      role="status"
                      aria-live="polite"
                    >
                      <strong>Preorders will start soon.</strong>
                      <p>
                        Your configuration is ready to revisit when ordering
                        opens. Nothing has been reserved or charged.
                      </p>
                    </div>
                  )}
                </div>
              ) : configuration.purchasable ? (
                <button
                  className="embossed-button store-primary-button"
                  type="button"
                  onClick={addConfiguredProduct}
                >
                  Add to bag
                  <span aria-hidden="true">+</span>
                </button>
              ) : (
                <div className="store-purchase-note">
                  <strong>Organization purchase</strong>
                  <p>{configuration.purchaseNote}</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
