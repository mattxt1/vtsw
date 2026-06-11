import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { ProductPlaceholder } from "../components/ProductPlaceholder";
import { useCart } from "../context/CartContext";
import { getAccessoryRecommendations } from "../data/accessoryRecommendations";
import { catalogProducts } from "../data/catalog";
import { getProductKey } from "../data/productKey";
import {
  formatPrice,
  getDefaultStoreSelections,
  getStoreConfiguration,
} from "../data/store";
import { getProductVisualKind } from "../utils/productVisual";

export function CartPage() {
  const { items, subtotal, addItem, removeItem, updateQuantity } = useCart();

  useEffect(() => {
    document.title = "Your bag - vela";
  }, []);

  const deviceInFocus = [...items]
    .reverse()
    .map((item) =>
      catalogProducts.find(
        (product) => getProductKey(product) === item.productKey,
      ),
    )
    .find(
      (product) =>
        product &&
        product.segmentId !== "accessories" &&
        product.segmentId !== "platform",
    );
  const cartProductKeys = new Set(items.map((item) => item.productKey));
  const recommendations = deviceInFocus
    ? getAccessoryRecommendations(deviceInFocus)
        .filter((product) => !cartProductKeys.has(getProductKey(product)))
        .slice(0, 4)
    : [];

  function addAccessory(productKey: string) {
    const accessory = catalogProducts.find(
      (product) => getProductKey(product) === productKey,
    );
    if (!accessory) return;

    const configuration = getStoreConfiguration(accessory);
    if (!configuration.purchasable) return;

    const selections = getDefaultStoreSelections(configuration);
    addItem({
      productKey,
      productName: accessory.displayName,
      productRoute: `/buy/${accessory.segmentId}/${accessory.id}`,
      selections,
      unitPrice:
        configuration.basePrice +
        selections.reduce(
          (total, selection) => total + selection.priceDelta,
          0,
        ),
    });
  }

  return (
    <PageTransition>
      <main id="main-content" className="cart-page section-shell">
        <header className="cart-heading">
          <p className="eyebrow">vela store</p>
          <h1>{items.length > 0 ? "Your bag." : "Your bag is quiet."}</h1>
          <p>
            {items.length > 0
              ? "Review your configurations before continuing."
              : "Explore vela devices and configure one that fits."}
          </p>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <Link className="embossed-button" to="/products/mobile">
              Shop phones
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/">Return to vela home</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => {
                const product = catalogProducts.find(
                  (candidate) =>
                    `${candidate.segmentId}:${candidate.id}` === item.productKey,
                );
                return (
                  <article className="cart-item" key={item.id}>
                    <div className="cart-item__media">
                      {product && (
                        <ProductPlaceholder
                          kind={getProductVisualKind(product)}
                          label={product.displayName}
                        />
                      )}
                    </div>
                    <div className="cart-item__details">
                      <div className="cart-item__title">
                        <div>
                          <p className="eyebrow">configured for you</p>
                          <h2>{item.productName}</h2>
                        </div>
                        <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
                      </div>
                      <dl>
                        {item.selections
                          .filter(
                            (selection) =>
                              selection.groupId !== "protect" ||
                              selection.optionId !== "none",
                          )
                          .map((selection) => (
                            <div
                              key={`${selection.groupId}-${selection.optionId}`}
                            >
                              <dt>{selection.groupLabel}</dt>
                              <dd>{selection.optionLabel}</dd>
                            </div>
                          ))}
                      </dl>
                      <div className="cart-item__actions">
                        <label>
                          Quantity
                          <select
                            value={item.quantity}
                            onChange={(event) =>
                              updateQuantity(item.id, Number(event.target.value))
                            }
                          >
                            {[1, 2, 3, 4].map((quantity) => (
                              <option key={quantity} value={quantity}>
                                {quantity}
                              </option>
                            ))}
                          </select>
                        </label>
                        <Link to={item.productRoute}>Edit configuration</Link>
                        <button type="button" onClick={() => removeItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              {deviceInFocus && recommendations.length > 0 && (
                <section
                  className="cart-accessories"
                  aria-labelledby="cart-accessories-heading"
                >
                  <div className="cart-accessories__heading">
                    <div>
                      <p className="eyebrow">complete your setup</p>
                      <h2 id="cart-accessories-heading">
                        Made for your {deviceInFocus.model}.
                      </h2>
                    </div>
                    <Link to="/products/accessories">
                      Explore all accessories →
                    </Link>
                  </div>
                  <div className="cart-accessories__grid">
                    {recommendations.map((accessory) => {
                      const configuration = getStoreConfiguration(accessory);
                      const needsConfiguration = configuration.optionGroups.some(
                        (group) =>
                          group.id === "variant" && group.options.length > 1,
                      );

                      return (
                        <article
                          className="cart-accessory-card"
                          key={accessory.id}
                        >
                          <Link
                            className="cart-accessory-card__visual"
                            to={`/products/accessories/${accessory.id}`}
                          >
                            <ProductPlaceholder
                              kind="accessory"
                              label={accessory.displayName}
                            />
                          </Link>
                          <div className="cart-accessory-card__copy">
                            <p>{accessory.groupName}</p>
                            <h3>{accessory.displayName}</h3>
                            <span>{accessory.tagline}</span>
                            <div>
                              <strong>
                                From {formatPrice(configuration.basePrice)}
                              </strong>
                              {configuration.purchasable &&
                              !needsConfiguration ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    addAccessory(getProductKey(accessory))
                                  }
                                >
                                  Add
                                  <span aria-hidden="true">+</span>
                                </button>
                              ) : (
                                <Link
                                  to={
                                    configuration.purchasable
                                      ? `/buy/accessories/${accessory.id}`
                                      : `/products/accessories/${accessory.id}`
                                  }
                                >
                                  {configuration.purchasable ? "Choose" : "View"}
                                </Link>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            <aside className="cart-summary">
              <p className="eyebrow">order summary</p>
              <dl>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>Included</dd>
                </div>
                <div>
                  <dt>Estimated tax</dt>
                  <dd>At checkout</dd>
                </div>
              </dl>
              <div className="cart-summary__total">
                <span>Total before tax</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <Link
                className="embossed-button store-primary-button"
                to="/checkout"
              >
                Check out
                <span aria-hidden="true">→</span>
              </Link>
              <p>Payment is not collected in this website prototype.</p>
            </aside>
          </div>
        )}
      </main>
    </PageTransition>
  );
}
