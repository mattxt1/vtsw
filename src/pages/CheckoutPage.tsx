import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/store";

export function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Checkout - vela";
  }, []);

  if (items.length === 0) return <Navigate to="/cart" replace />;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageTransition>
      <main id="main-content" className="checkout-page section-shell">
        <header className="checkout-heading">
          <p className="eyebrow">secure checkout prototype</p>
          <h1>Where should it arrive?</h1>
          <p>
            Add delivery details and review the order. Payment is intentionally
            not connected yet.
          </p>
        </header>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Contact</legend>
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Phone number
                <input name="tel" type="tel" autoComplete="tel" required />
              </label>
            </fieldset>
            <fieldset>
              <legend>Delivery address</legend>
              <div className="checkout-form__row">
                <label>
                  First name
                  <input name="firstName" autoComplete="given-name" required />
                </label>
                <label>
                  Last name
                  <input name="lastName" autoComplete="family-name" required />
                </label>
              </div>
              <label>
                Street address
                <input name="address" autoComplete="street-address" required />
              </label>
              <div className="checkout-form__row">
                <label>
                  City
                  <input name="city" autoComplete="address-level2" required />
                </label>
                <label>
                  State
                  <input name="state" autoComplete="address-level1" required />
                </label>
                <label>
                  ZIP code
                  <input name="postalCode" autoComplete="postal-code" required />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Delivery</legend>
              <label className="checkout-delivery-option">
                <input type="radio" name="delivery" defaultChecked />
                <span>
                  <strong>Standard delivery</strong>
                  <small>Arrives when every item is ready</small>
                </span>
                <b>Included</b>
              </label>
            </fieldset>
            <button
              className="embossed-button store-primary-button"
              type="submit"
            >
              Continue to payment
              <span aria-hidden="true">→</span>
            </button>
            {submitted && (
              <div className="checkout-notice" role="status">
                <strong>This is the end of the prototype checkout.</strong>
                <p>
                  No payment details were requested and no order was placed.
                </p>
              </div>
            )}
          </form>

          <aside className="checkout-summary">
            <p className="eyebrow">your order</p>
            {items.map((item) => (
              <div className="checkout-summary__item" key={item.id}>
                <span>
                  {item.quantity} x {item.productName}
                </span>
                <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
              </div>
            ))}
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
                <dt>Tax</dt>
                <dd>Calculated later</dd>
              </div>
            </dl>
            <div className="checkout-summary__total">
              <span>Total before tax</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <Link to="/cart">Return to bag</Link>
          </aside>
        </div>
      </main>
    </PageTransition>
  );
}
