import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchSite } from "../data/search";
import { SearchResultList } from "./SearchResultList";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const surfaceRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const results = query.trim() ? searchSite(query, 6) : [];

  function closeDialog() {
    setQuery("");
    onClose();
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) return;
    navigate(`/search?q=${encodeURIComponent(nextQuery)}`);
    closeDialog();
  }

  return (
    <motion.div
      className="search-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeDialog();
          return;
        }

        if (event.key !== "Tab") return;
        const focusable = surfaceRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
    >
      <motion.button
        className="search-dialog__backdrop"
        type="button"
        onClick={closeDialog}
        aria-label="Close search"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.section
        ref={surfaceRef}
        className="search-dialog__surface"
        initial={{ opacity: 0, y: -24, scale: 0.975, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.48,
          delay: 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="search-dialog__heading"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.16, ease: "easeOut" }}
        >
          <div>
            <p className="eyebrow">Search vela</p>
            <h2 id="search-dialog-title">What are you looking for?</h2>
          </div>
          <button type="button" onClick={closeDialog}>
            Close
            <span aria-hidden="true">×</span>
          </button>
        </motion.div>

        <motion.form
          className="search-form"
          role="search"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.42,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, software, and pages"
            aria-label="Search vela"
            autoComplete="off"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}>
              Clear
            </button>
          )}
        </motion.form>

        <motion.div
          className="search-dialog__content"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.28 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!query.trim() ? (
              <motion.div
                className="search-quick-links"
                key="quick-links"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <p>Popular now</p>
                <div>
                  <Link to="/products/mobile/x26-ultra" onClick={closeDialog}>
                    x26 Ultra
                  </Link>
                  <Link
                    to="/products/computing/notebook-ultra"
                    onClick={closeDialog}
                  >
                    notebook ultra
                  </Link>
                  <Link to="/products/platform/vos-27" onClick={closeDialog}>
                    vOS 27
                  </Link>
                  <Link to="/products/accessories" onClick={closeDialog}>
                    accessories
                  </Link>
                </div>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                className="search-dialog__results"
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <motion.div
                  className="search-dialog__summary"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <p>{results.length} top results</p>
                  <Link
                    to={`/search?q=${encodeURIComponent(query.trim())}`}
                    onClick={closeDialog}
                  >
                    View all results
                  </Link>
                </motion.div>
                <SearchResultList
                  results={results}
                  onNavigate={closeDialog}
                  animated
                />
              </motion.div>
            ) : (
              <motion.div
                className="search-empty"
                key="empty"
                initial={{ opacity: 0, y: 14, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="eyebrow">No close matches</p>
                <h3>Try a product family or feature.</h3>
                <p>For example: x26, notebook, OLED, ethos ai, or charging.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
