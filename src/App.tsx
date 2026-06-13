import { AnimatePresence, MotionConfig } from "motion/react";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { BuyPage } from "./pages/BuyPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductPage } from "./pages/ProductPage";
import { SearchPage } from "./pages/SearchPage";
import { SegmentPage } from "./pages/SegmentPage";
import { SitemapPage } from "./pages/SitemapPage";
import { VOS27Page } from "./pages/VOS27Page";

const ComparePage = lazy(() =>
  import("./pages/ComparePage").then((module) => ({
    default: module.ComparePage,
  })),
);

function CompareRoute() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="compare-loading section-shell">
          <p className="eyebrow">vela compare</p>
          <p>Preparing current and archived devices...</p>
        </main>
      }
    >
      <ComparePage />
    </Suspense>
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
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/compare" element={<CompareRoute />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/products/:segmentId" element={<SegmentPage />} />
              <Route path="/products/platform/vos-27" element={<VOS27Page />} />
              <Route
                path="/products/:segmentId/:productId"
                element={<ProductPage />}
              />
              <Route path="/buy/:segmentId/:productId" element={<BuyPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </AppShell>
      </MotionConfig>
    </CartProvider>
  );
}
