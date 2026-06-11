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
          <a className="nav-link" href="/#products">products</a>
          <Link className="nav-link" to="/compare">compare</Link>
          <a className="nav-link" href="/#ecosystem">ecosystem</a>
          <a className="nav-link" href="/#software">software</a>
          <a className="nav-link" href="/#about">about</a>
        </nav>
      </header>
      {children}
    </div>
  );
}
