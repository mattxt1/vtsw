import { AnimatePresence, MotionConfig } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ScrollToTop } from "./components/ScrollToTop";
import { BrandPage } from "./pages/BrandPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <AppShell>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands/:slug" element={<BrandPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </AppShell>
    </MotionConfig>
  );
}
