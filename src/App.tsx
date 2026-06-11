import { AnimatePresence, MotionConfig } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ScrollToTop } from "./components/ScrollToTop";
import { ComparePage } from "./pages/ComparePage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductPage } from "./pages/ProductPage";
import { PurchaseUnavailablePage } from "./pages/PurchaseUnavailablePage";
import { SegmentPage } from "./pages/SegmentPage";

export function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <AppShell>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/products/:segmentId" element={<SegmentPage />} />
            <Route
              path="/products/:segmentId/:productId"
              element={<ProductPage />}
            />
            <Route
              path="/buy/:segmentId/:productId"
              element={<PurchaseUnavailablePage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </AppShell>
    </MotionConfig>
  );
}
