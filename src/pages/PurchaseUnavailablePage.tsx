import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { getProduct } from "../data/catalog";

export function PurchaseUnavailablePage() {
  const { segmentId, productId } = useParams();
  const product = getProduct(segmentId, productId);

  useEffect(() => {
    document.title = product
      ? `Buy ${product.displayName} — coming later`
      : "Page not found — vela";
  }, [product]);

  if (!product) return <Navigate to="/not-found" replace />;

  return (
    <PageTransition>
      <main id="main-content" className="purchase-unavailable">
        <p className="eyebrow">404 / vela store</p>
        <h1>The store is not connected yet.</h1>
        <p>
          The purchase experience for {product.displayName} will be built in a
          later phase. Its discover page is ready whenever you are.
        </p>
        <div className="purchase-unavailable__actions">
          <Link
            className="embossed-button"
            to={`/products/${product.segmentId}/${product.id}`}
          >
            Return to {product.model}
            <span aria-hidden="true">←</span>
          </Link>
          <Link to="/">vela home</Link>
        </div>
      </main>
    </PageTransition>
  );
}
