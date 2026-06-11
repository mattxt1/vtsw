import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="brand-lockup">
          <Link className="wordmark tactile-label" to="/" aria-label="vela home">
            vela
          </Link>
          <span>by veritas</span>
        </div>
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
          <Link className="nav-link" to="/compare">compare</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
