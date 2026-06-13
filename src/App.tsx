import { AnimatePresence, MotionConfig } from "motion/react";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const BuyPage = lazy(() =>
  import("./pages/BuyPage").then((module) => ({ default: module.BuyPage })),
);
const CartPage = lazy(() =>
  import("./pages/CartPage").then((module) => ({ default: module.CartPage })),
);
const CheckoutPage = lazy(() =>
  import("./pages/CheckoutPage").then((module) => ({
    default: module.CheckoutPage,
  })),
);
const ProductPage = lazy(() =>
  import("./pages/ProductPage").then((module) => ({
    default: module.ProductPage,
  })),
);
const SearchPage = lazy(() =>
  import("./pages/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);
const SegmentPage = lazy(() =>
  import("./pages/SegmentPage").then((module) => ({
    default: module.SegmentPage,
  })),
);
const SitemapPage = lazy(() =>
  import("./pages/SitemapPage").then((module) => ({
    default: module.SitemapPage,
  })),
);
const VOS27Page = lazy(() =>
  import("./pages/VOS27Page").then((module) => ({
    default: module.VOS27Page,
  })),
);

const ComparePage = lazy(() =>
  import("./pages/ComparePage").then((module) => ({
    default: module.ComparePage,
  })),
);

function RouteLoading() {
  return (
    <main id="main-content" className="route-loading section-shell" role="status">
      <p className="eyebrow">vela</p>
      <p>Preparing the experience...</p>
    </main>
  );
}

export function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <AppShell>
          <AnimatePresence mode="wait" initial={false}>
            <Suspense fallback={<RouteLoading />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/products/:segmentId" element={<SegmentPage />} />
                <Route
                  path="/products/platform/vos-27"
                  element={<VOS27Page />}
                />
                <Route
                  path="/products/:segmentId/:productId"
                  element={<ProductPage />}
                />
                <Route path="/buy/:segmentId/:productId" element={<BuyPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </AppShell>
      </MotionConfig>
    </CartProvider>
  );
}
