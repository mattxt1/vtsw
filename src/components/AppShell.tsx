import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SearchDialog } from "./SearchDialog";

export function AppShell({ children }: { children: ReactNode }) {
  const { itemCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark tactile-label" to="/" aria-label="vela home">
          vela
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link className="nav-link" to="/products/mobile">phones</Link>
          <Link className="nav-link" to="/products/computing#notebook">
            notebooks
          </Link>
          <Link className="nav-link" to="/products/computing#tab-t-series">
            tablets
          </Link>
          <Link className="nav-link" to="/products/wearables">wearables</Link>
          <Link className="nav-link" to="/products/display">tv + home</Link>
          <Link className="nav-link" to="/products/accessories">accessories</Link>
          <Link className="nav-link" to="/products/platform">software</Link>
          <Link className="nav-link" to="/compare">compare</Link>
          <button
            className="nav-link nav-search"
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-haspopup="dialog"
          >
            search
            <span aria-hidden="true">⌘K</span>
          </button>
          <Link className="nav-link nav-link--bag" to="/cart">
            bag
            {itemCount > 0 && <span aria-label={`${itemCount} items`}>{itemCount}</span>}
          </Link>
        </nav>
      </header>
      <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />
      {children}
    </div>
  );
}
