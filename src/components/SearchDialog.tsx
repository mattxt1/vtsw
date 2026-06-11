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
    <div
      className="search-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
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
      <button
        className="search-dialog__backdrop"
        type="button"
        onClick={closeDialog}
        aria-label="Close search"
        tabIndex={-1}
      />
      <section ref={surfaceRef} className="search-dialog__surface">
        <div className="search-dialog__heading">
          <div>
            <p className="eyebrow">Search vela</p>
            <h2 id="search-dialog-title">What are you looking for?</h2>
          </div>
          <button type="button" onClick={closeDialog}>
            Close
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <form className="search-form" role="search" onSubmit={handleSubmit}>
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
        </form>

        <div className="search-dialog__content" aria-live="polite">
          {!query.trim() ? (
            <div className="search-quick-links">
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
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="search-dialog__summary">
                <p>{results.length} top results</p>
                <Link
                  to={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={closeDialog}
                >
                  View all results
                </Link>
              </div>
              <SearchResultList results={results} onNavigate={closeDialog} />
            </>
          ) : (
            <div className="search-empty">
              <p className="eyebrow">No close matches</p>
              <h3>Try a product family or feature.</h3>
              <p>For example: x26, notebook, OLED, ethos ai, or charging.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
