import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { ProductPlaceholder } from "../components/ProductPlaceholder";
import { useCart } from "../context/CartContext";
import { catalogProducts } from "../data/catalog";
import { formatPrice } from "../data/store";
import { getProductVisualKind } from "../utils/productVisual";

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  useEffect(() => {
    document.title = "Your bag - vela";
  }, []);

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
