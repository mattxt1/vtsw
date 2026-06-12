import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/store";
import {
  calculateThrivePayPayment,
  getThrivePayPlan,
} from "../data/thrivepay";

type CheckoutStep = "delivery" | "payment";
type PaymentMethod = "card" | "thrivepay";

function formatPayment(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CheckoutPage() {
  const { items, subtotal } = useCart();
  const plan = useMemo(
    () => getThrivePayPlan(items, subtotal),
    [items, subtotal],
  );
  const [step, setStep] = useState<CheckoutStep>("delivery");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("thrivepay");
  const [downPayment, setDownPayment] = useState(plan.defaultDownPayment);
  const [term, setTerm] = useState(plan.defaultTerm);
  const [autopay, setAutopay] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const payment = calculateThrivePayPayment(subtotal, downPayment, term);

  useEffect(() => {
    document.title = "Checkout - vela";
  }, []);

  if (items.length === 0) return <Navigate to="/cart" replace />;

  function handleDelivery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep("payment");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function chooseDownPayment(value: number) {
    setDownPayment(
      Math.min(Math.max(0, Math.round(value)), plan.maximumDownPayment),
    );
  }

  return (
    <PageTransition>
      <main id="main-content" className="checkout-page section-shell">
        <header className="checkout-heading">
          <p className="eyebrow">
            secure checkout prototype / step {step === "delivery" ? "1" : "2"} of 2
          </p>
          <h1>
            {step === "delivery"
              ? "Where should it arrive?"
              : "How would you like to pay?"}
          </h1>
          <p>
            {step === "delivery"
              ? "Add delivery details, then choose how to pay."
              : "Pay today or build a clear monthly plan with thrivepay. No payment or credit check will be submitted in this prototype."}
          </p>
          <ol className="checkout-progress" aria-label="Checkout progress">
            <li className="is-complete">
              <span>1</span>
              Delivery
            </li>
            <li className={step === "payment" ? "is-current" : ""}>
              <span>2</span>
              Payment
            </li>
          </ol>
        </header>

        <div className="checkout-layout">
          {step === "delivery" ? (
            <form className="checkout-form" onSubmit={handleDelivery}>
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
            </form>
          ) : (
            <form
              className="checkout-payment"
              onSubmit={handlePayment}
              aria-label="Payment method"
            >
              <fieldset className="payment-methods">
                <legend>Choose a payment method.</legend>
                <label
                  className={`payment-method-card ${
                    paymentMethod === "card" ? "is-selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => {
                      setPaymentMethod("card");
                      setSubmitted(false);
                    }}
                  />
                  <span className="payment-method-card__icon" aria-hidden="true">
                    ▰
                  </span>
                  <span>
                    <strong>Credit or debit card</strong>
                    <small>Pay {formatPrice(subtotal)} today</small>
                  </span>
                  <b>Pay in full</b>
                </label>

                <label
                  className={`payment-method-card payment-method-card--thrive ${
                    paymentMethod === "thrivepay" ? "is-selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="thrivepay"
                    checked={paymentMethod === "thrivepay"}
                    onChange={() => {
                      setPaymentMethod("thrivepay");
                      setSubmitted(false);
                    }}
                  />
                  <img
                    src="/assets/thrive/thrive-icon.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <span>
                    <strong>thrivepay monthly</strong>
                    <small>
                      From {formatPayment(payment.monthlyPayment)}/month
                    </small>
                  </span>
                  <b>0% while current</b>
                </label>
              </fieldset>

              {paymentMethod === "thrivepay" ? (
                <section className="thrivepay-module" aria-labelledby="thrivepay-heading">
                  <div className="thrivepay-module__brand">
                    <img
                      src="/assets/thrive/thrive-logo-white.svg"
                      alt="thrive"
                    />
                    <span>thrivepay</span>
                  </div>
                  <div className="thrivepay-module__intro">
                    <div>
                      <p>pay monthly with thrivepay</p>
                      <h2 id="thrivepay-heading">
                        {formatPayment(payment.monthlyPayment)}
                        <span>/month</span>
                      </h2>
                    </div>
                    <p>
                      {term} monthly payments with {formatPayment(payment.downPayment)} due
                      today. 0% APR when payments are made on time.
                    </p>
                  </div>

                  <div className="thrivepay-controls">
                    <div className="thrivepay-control">
                      <div className="thrivepay-control__heading">
                        <div>
                          <label htmlFor="thrive-down-payment">Pay today</label>
                          <p>Choose $0 through 90% of your purchase.</p>
                        </div>
                        <strong>{formatPayment(payment.downPayment)}</strong>
                      </div>
                      <input
                        id="thrive-down-payment"
                        className="thrivepay-range"
                        type="range"
                        min="0"
                        max={plan.maximumDownPayment}
                        step="1"
                        value={payment.downPayment}
                        onChange={(event) =>
                          chooseDownPayment(Number(event.target.value))
                        }
                      />
                      <div className="thrivepay-quick-values">
                        {[0, 0.1, 0.2, 0.3].map((percentage) => (
                          <button
                            type="button"
                            key={percentage}
                            onClick={() => chooseDownPayment(subtotal * percentage)}
                          >
                            {percentage === 0 ? "$0" : `${percentage * 100}%`}
                          </button>
                        ))}
                        <label>
                          Custom
                          <span>
                            $
                            <input
                              aria-label="Custom down payment"
                              type="number"
                              min="0"
                              max={plan.maximumDownPayment}
                              value={payment.downPayment}
                              onChange={(event) =>
                                chooseDownPayment(Number(event.target.value))
                              }
                            />
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="thrivepay-control">
                      <div className="thrivepay-control__heading">
                        <div>
                          <p className="thrivepay-control__label">Payment term</p>
                          <p>Available for {plan.categoryLabel}.</p>
                        </div>
                        <strong>{term} months</strong>
                      </div>
                      <div className="thrivepay-terms">
                        {plan.terms.map((availableTerm) => (
                          <label
                            className={term === availableTerm ? "is-selected" : ""}
                            key={availableTerm}
                          >
                            <input
                              type="radio"
                              name="term"
                              value={availableTerm}
                              checked={term === availableTerm}
                              onChange={() => setTerm(availableTerm)}
                            />
                            <strong>{availableTerm}</strong>
                            <span>months</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="thrivepay-plan-summary">
                    <div>
                      <span>Due today</span>
                      <strong>{formatPayment(payment.downPayment)}</strong>
                    </div>
                    <div>
                      <span>Amount financed</span>
                      <strong>{formatPayment(payment.financedAmount)}</strong>
                    </div>
                    <div>
                      <span>Monthly payment</span>
                      <strong>{formatPayment(payment.monthlyPayment)}</strong>
                    </div>
                    <div>
                      <span>On-time APR</span>
                      <strong>0%</strong>
                    </div>
                  </div>

                  <label className="thrivepay-autopay">
                    <input
                      type="checkbox"
                      checked={autopay}
                      onChange={(event) => setAutopay(event.target.checked)}
                    />
                    <span>
                      <strong>Use autopay</strong>
                      <small>
                        Recommended to help keep your promotional 0% APR active.
                      </small>
                    </span>
                  </label>

                  <details className="thrivepay-disclosure">
                    <summary>Important thrivepay terms</summary>
                    <p>
                      This estimate does not affect your credit. Final terms are
                      subject to approval by thrive and may require a different
                      down payment or term.
                    </p>
                    <p>
                      Payments have a 7-day grace period. If a payment remains
                      unpaid, a variable APR may apply to the remaining balance
                      until the account is current. Exact APR, dates, credit
                      reporting terms, and regional disclosures appear before a
                      real order is completed.
                    </p>
                    <p>
                      No origination fee, monthly service fee, maintenance fee,
                      hidden checkout fee, or prepayment penalty applies while
                      the plan remains current.
                    </p>
                  </details>

                  <button
                    className="thrivepay-primary-button"
                    type="submit"
                  >
                    <img
                      src="/assets/thrive/thrive-icon.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    Continue with thrivepay
                    <span aria-hidden="true">→</span>
                  </button>
                </section>
              ) : (
                <section className="card-payment-preview">
                  <div className="card-payment-preview__icon" aria-hidden="true">
                    ▰
                  </div>
                  <div>
                    <p className="eyebrow">pay in full</p>
                    <h2>{formatPrice(subtotal)} today.</h2>
                    <p>
                      Secure card entry will be connected when payment
                      infrastructure is implemented. No card details are
                      requested in this prototype.
                    </p>
                  </div>
                  <button
                    className="embossed-button store-primary-button"
                    type="submit"
                  >
                    Continue with card
                    <span aria-hidden="true">→</span>
                  </button>
                </section>
              )}

              <button
                className="checkout-back-button"
                type="button"
                onClick={() => {
                  setStep("delivery");
                  setSubmitted(false);
                }}
              >
                ← Edit delivery details
              </button>

              {submitted && (
                <div className="checkout-notice" role="status">
                  <strong>
                    {paymentMethod === "thrivepay"
                      ? "Your thrivepay plan is ready to review."
                      : "Card checkout is ready for its secure connection."}
                  </strong>
                  <p>
                    This is a checkout prototype. No identity check, credit
                    inquiry, payment, financing agreement, or order was
                    submitted.
                  </p>
                </div>
              )}
            </form>
          )}

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
            {step === "payment" && paymentMethod === "thrivepay" && (
              <div className="checkout-summary__thrive">
                <img src="/assets/thrive/thrive-logo-dark.svg" alt="thrive" />
                <div>
                  <span>Estimated plan</span>
                  <strong>{formatPayment(payment.monthlyPayment)}/mo</strong>
                  <small>
                    {term} months · {formatPayment(payment.downPayment)} today
                  </small>
                </div>
              </div>
            )}
            <Link to="/cart">Return to bag</Link>
          </aside>
        </div>
      </main>
    </PageTransition>
  );
}
